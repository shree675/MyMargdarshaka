//@ts-check

import React from "react";
import AdminNavbar from "../Navbar/admin-navbar";
import axios from "axios";
import "./admin-applications.css";
import TextField from "@mui/material/TextField";
import { IoBan } from "react-icons/io5";
import { styled } from "@mui/material/styles";

// custom css for materialui textfields
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#4e0d3a",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#4e0d3a",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
      border: "none",
      borderBottom: "2px solid #4e0d3a",
      borderRadius: "0px",
    },
    "&:hover fieldset": {
      borderColor: "gray",
    },
    "&.Mui-focused fieldset": {
      border: "none",
      borderBottom: "2px solid #4e0d3a",
      borderRadius: "0px",
    },
  },
});

// card component
const ApplicationCard = (props) => {
  // function to approve a mentor
  const handleApprove = async (user) => {
    console.log("approve ", user.name);
    // middleware token for protection
    const tk = await localStorage.getItem("basicAuth");
    // updating the database to approve mentor
    await axios
      .post(`/api/mentor/update-by-id/${user._id}`, { approved: true }, { headers: { Authorization: `Basic ${tk}` } })
      .then((e) => {
        // sending a confirmation email to the approved mentor
        axios.get(`/api/sendemail/${props.app.email}`).catch((err) => {
          console.log(err);
          alert("Error: Email could not be sent to the approved candidate");
        });
      });
    props.setApproved(user._id);
    await axios.get(`/api/mentor/findmatches/${user._id}`, {
      headers: { Authorization: `Basic ${tk}` },
    });
  };

  const handleReject = async (user) => {
    // function to reject a mentor
    console.log("reject ", user.name);
    const tk = await localStorage.getItem("basicAuth");
    // updating the database to reject the mentor
    await axios.post(`/api/mentor/update-by-id/${user._id}`, { rejected: true }, { headers: { Authorization: `Basic ${tk}` } });
    props.setRejected(user);
  };

  // frontend components of each card to render in the page
  return (
    <div className='admin-applications-card'>
      <div className='admin-applications-card-row1'>
        <div>{props.app.name}</div>
        <div>{props.app.phone}</div>
      </div>
      <div className='admin-applications-card-row2'>
        <div>Email : {props.app.email}</div>
        <div>
          <b>Language : </b>
          {props.app.language}
        </div>
        <div>
          <b>Time slot : </b>
          {props.app.timeSlot}
        </div>
        <div>
          <b>Classes : </b>
          {props.app.Classes.map((cls) => (
            <div style={{ marginLeft: "2vw" }}>{cls.code}</div>
          ))}
        </div>
      </div>

      <div className='admin-applications-card-row3'>
        <div
          className='admin-applications-card-button'
          onClick={() => {
            handleApprove(props.app); // approves a mentor application
          }}
          style={props.rej ? { display: "none" } : {}}
        >
          APPROVE
        </div>
        <div
          className='admin-applications-card-button'
          onClick={() => {
            handleReject(props.app);
          }}
          style={props.rej ? { display: "none" } : {}}
        >
          REJECT
        </div>
      </div>
    </div>
  );
};

// main page component
class AdminApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      searchText: "",
      searchResultText: "",
      openApplications: [],
      rejectedApplications: [],
      searchResults: [],
      tk: localStorage.getItem("basicAuth"),
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
    this.handleBanUser = this.handleBanUser.bind(this);
    this.getData = this.getData.bind(this);
    this.setApproved = this.setApproved.bind(this);
    this.setRejected = this.setRejected.bind(this);
  }

  // method to search users in the database
  handleSearchTextChange(e) {
    this.setState({ searchText: e.target.value });
  }

  // method to search users in the database
  handleSubmitText(e) {
    if (e.keyCode === 13) {
      console.log(this.state.searchText);
      this.setState({ searchResultText: this.state.searchText });
      // submit this search text to Backend for Query
      this.setState({ searchResults: [] });
      axios
        .get(`/api/mentor/search/${this.state.searchText}`, {
          headers: { Authorization: `Basic ${this.state.tk}` },
        })
        .then((e) => {
          // searching the users in both databases
          this.setState({
            searchResults: e.data.filter((user) => !user.is_banned),
          });
          axios
            .get(`/api/learner/search/${this.state.searchText}`, {
              headers: { Authorization: `Basic ${this.state.tk}` },
            })
            .then((e) => {
              this.setState({
                searchResults: this.state.searchResults.concat(e.data.filter((user) => !user.is_banned)),
              });
              console.log(this.state.searchResults);
            });
        });
    }
  }

  // will be passed to child (ApplicationCard) to set the parent state
  setApproved(mentor_id) {
    const newOpenApp = this.state.openApplications.filter((app) => app._id != mentor_id);
    this.setState({ openApplications: newOpenApp });
  }

  setRejected(mentor) {
    const newOpenApp = this.state.openApplications.filter((app) => app._id != mentor._id);
    this.setState({
      openApplications: newOpenApp,
      rejectedApplications: [...this.state.rejectedApplications, mentor],
    });
  }

  // method to ban a user
  handleBanUser(user) {
    console.log("ban ", user.name);
  }

  async getData() {
    // middleware token
    const tk = await localStorage.getItem("basicAuth");
    console.log("get Data tk : ", tk);
    const res = await axios.get("/api/mentor/get/mentors/open", {
      headers: { Authorization: `Basic ${tk}` },
    });
    // populating accepted and rejected applications
    const openApp = res.data;
    //console.log(openApp);
    this.setState({ openApplications: openApp });

    const res2 = await axios.get("/api/mentor/get/mentors/rejected", {
      headers: { Authorization: `Basic ${tk}` },
    });
    const rejApp = res2.data;
    //console.log(rejApp);
    this.setState({ rejectedApplications: rejApp });
  }

  // verify if some user is already in session
  componentDidMount() {
    if (localStorage.getItem("isloggedin") === null || localStorage.getItem("isloggedin") === "false") {
      window.location = "/admin-auth";
    }
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "mentor"
    ) {
      window.location = "/my-students";
    } else if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "learner"
    ) {
      window.location = "/my-mentors";
    }
    // console.log("comp did mount");
    this.getData();
  }

  // rendering the frontend page
  render() {
    return (
      <div>
        <AdminNavbar />
        <div className='admin-main'>
          <div className='admin-applications-leftbox'>
            <div className='admin-applications-tab-switcher'>
              <div
                className='admin-applications-tab-button'
                style={this.state.tab == 0 ? { border: "solid 3px red", opacity: 1 } : {}}
                onClick={() => {
                  this.setState({ tab: 0 });
                }}
              >
                OPEN APPLICATIONS
              </div>
              <div
                className='admin-applications-tab-button'
                style={this.state.tab == 1 ? { border: "solid 3px red", opacity: 1 } : {}}
                onClick={() => {
                  this.setState({ tab: 1 });
                }}
              >
                REJECTED APPLICATIONS
              </div>
            </div>
            {/* search field in mobile view */}
            <div className='admin-applications-right-box-phone'>
              <CssTextField
                id='outlined-basic'
                label='🔍Search for User by Name or Phone Number'
                variant='outlined'
                value={this.state.searchText}
                onChange={this.handleSearchTextChange}
                onKeyUp={this.handleSubmitText}
              />
              <div className='admin-applications-search-results'>
                <div>{this.state.searchResultText !== "" ? `Search results for \"${this.state.searchResultText}\"` : ""}</div>
                {this.state.searchResults.map((user, i) => (
                  <div className='admin-applications-search-results-card' style={{ background: i % 2 == 0 ? "#E8DEE5" : "#F9F6F8" }}>
                    <div>
                      <div style={{ fontWeight: "bold" }}>{user.name}</div>
                      <div>{user.phone}</div>
                    </div>
                    <div
                      onClick={(event) => {
                        // function to ban a user
                        const data = {
                          is_banned: true,
                        };
                        axios.post("/api/user/update/newphone/" + user.phone, data);
                        if (user.NIOS_status !== undefined) {
                          // banning the learner
                          axios
                            .post("/api/learner/update/id/" + user._id, data, { headers: { Authorization: `Basic ${this.state.tk}` } })
                            .then(() => {
                              const e = {
                                keyCode: 13,
                              };
                              this.handleSubmitText(e);
                            });
                        } else {
                          // banning the mentor
                          axios
                            .post("/api/mentor/update-by-id/" + user._id, data, {
                              headers: { Authorization: `Basic ${this.state.tk}` },
                            })
                            .then(() => {
                              const e = {
                                keyCode: 13,
                              };
                              this.handleSubmitText(e);
                            });
                        }
                      }}
                    >
                      BAN USER
                      <IoBan style={{ color: "red", marginLeft: "1vw" }} />
                    </div>
                  </div>
                ))}{" "}
              </div>
            </div>
            <div style={this.state.tab == 1 ? { display: "none" } : {}} className='admin-applications-applications'>
              {this.state.openApplications.map((item) => (
                <ApplicationCard app={item} setApproved={this.setApproved} setRejected={this.setRejected} />
              ))}
            </div>
            <div style={this.state.tab == 0 ? { display: "none" } : {}} className='admin-applications-applications'>
              {this.state.rejectedApplications.map((item) => (
                <ApplicationCard app={item} rej={true} />
              ))}
            </div>
          </div>
          {/* search field in desktop view */}
          <div className='admin-applications-right-box'>
            <CssTextField
              id='outlined-basic'
              label='🔍Search for User by Name or Phone Number'
              variant='outlined'
              value={this.state.searchText}
              onChange={this.handleSearchTextChange}
              onKeyUp={this.handleSubmitText}
            />
            <div className='admin-applications-search-results'>
              <div>{this.state.searchResultText != "" ? `Search results for \"${this.state.searchResultText}\"` : ""}</div>
              {this.state.searchResults.map((user, i) => (
                <div className='admin-applications-search-results-card' style={{ background: i % 2 == 0 ? "#E8DEE5" : "#F9F6F8" }}>
                  <div>
                    <div style={{ fontWeight: "bold" }}>{user.name}</div>
                    <div>{user.phone}</div>
                  </div>
                  <div
                    onClick={(event) => {
                      // functio to ban a user
                      const data = {
                        is_banned: true,
                      };
                      axios.post("/api/user/update/newphone/" + user.phone, data);
                      if (user.NIOS_status !== undefined) {
                        // banning the learner
                        axios
                          .post("/api/learner/update/id/" + user._id, data, { headers: { Authorization: `Basic ${this.state.tk}` } })
                          .then(() => {
                            const e = {
                              keyCode: 13,
                            };
                            this.handleSubmitText(e);
                          });
                      } else {
                        // banning the mentor
                        axios
                          .post("/api/mentor/update-by-id/" + user._id, data, { headers: { Authorization: `Basic ${this.state.tk}` } })
                          .then(() => {
                            const e = {
                              keyCode: 13,
                            };
                            this.handleSubmitText(e);
                          });
                      }
                    }}
                  >
                    BAN USER
                    <IoBan style={{ color: "red", marginLeft: "1vw" }} />
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminApplications;

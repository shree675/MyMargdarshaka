//@ts-check

import React from "react";
import AdminNavbar from "../Navbar/admin-navbar";
import "./admin-home.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { IoBan } from "react-icons/io5";
import axios from "axios";

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
  if (props.app === undefined) {
    return null;
  }

  // frontend components of each card
  return (
    <div className='admin-applications-card'>
      <div className='admin-applications-card-row1'>
        <div style={{ padding: "10px", textAlign: "center" }}>{props.app.issueType}</div>
        <div>{props.app.issueSubject}</div>
      </div>
      <div className='admin-applications-card-rowx'>
        <div style={{ fontWeight: 600 }}>
          {props.app.username} | {props.app.phone} | {props.app.timestamp}
        </div>
      </div>
      <div className='admin-applications-card-rowx'>
        <div>{props.app.issueBody}</div>
      </div>
      <div className='admin-applications-card-row3'>
        {props.pageNo === 1 ? (
          <div
            className='admin-applications-card-button'
            onClick={(e) => {
              // function to make the admin take up the issue
              let username = localStorage.getItem("username");
              const data = {
                status: 0,
                assignedTo: username,
              };
              // repopulating the list
              axios
                .post("/api/feedback/update/" + props.app._id, data)
                .then(() => props.updateIssues())
                .catch((err) => console.log(err));
            }}
          >
            MANAGE ISSUE
          </div>
        ) : props.pageNo === 2 ? (
          <div
            className='admin-applications-card-button'
            onClick={() => {
              // function to make the admin resolve the issue
              let username = localStorage.getItem("username");
              const data = {
                status: 1,
                assignedTo: username,
              };
              // repopulating the list
              axios
                .post("/api/feedback/update/" + props.app._id, data)
                .then(() => props.updateIssues())
                .catch((err) => console.log(err));
            }}
          >
            MARK RESOLVED
          </div>
        ) : null}
      </div>
    </div>
  );
};

// main page component
class AdminHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      searchText: "",
      searchResultText: "",
      newIssues: [],
      manage: [],
      resolvedIssues: [],
      searchResults: [],
      tk: localStorage.getItem("basicAuth"),
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
    this.updateIssues = this.updateIssues.bind(this);
  }

  // method to search users
  handleSearchTextChange(e) {
    this.setState({ searchText: e.target.value });
  }

  // method to submit search
  handleSubmitText(e) {
    if (e.keyCode === 13) {
      console.log(this.state.searchText);
      this.setState({ searchResultText: this.state.searchText });
      // submit this search text to Backend for Query
      this.setState({ searchResults: [] });
      // searching both the databases for matches
      axios
        .get(`/api/mentor/search/${this.state.searchText}`, {
          headers: { Authorization: `Basic ${this.state.tk}` },
        })
        .then((e) => {
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

  // funciton to populate the issues lists
  updateIssues() {
    axios
      .get("/api/feedback/getfeedbacks")
      .then((data) => {
        this.setState({
          newIssues: data.data.map((e) => {
            // new issues
            if (e.assignedTo === "none") {
              return e;
            }
          }),
          manage: data.data.map((e) => {
            // managing issues
            if (e.assignedTo === localStorage.getItem("username") && e.status === 0) {
              return e;
            }
          }),
          resolvedIssues: data.data.map((e) => {
            // resolved issues
            if (e.assignedTo === localStorage.getItem("username") && e.status === 1) {
              return e;
            }
          }),
        });
      })
      .catch((err) => console.log(err));
  }

  // method to verify if a user is already logged in
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
    this.updateIssues();
  }

  // frontend component of the main application
  render() {
    return (
      <div>
        <AdminNavbar />
        <div className='admin-main'>
          <div className='admin-applications-leftbox'>
            <div className='admin-applications-tab-switcher'>
              <div
                className='admin-applications-tab-button'
                style={this.state.tab === 0 ? { border: "solid 3px red", opacity: 1 } : {}}
                onClick={() => {
                  this.setState({ tab: 0 }); // new issues tab
                }}
              >
                NEW ISSUES
              </div>
              <div
                className='admin-applications-tab-button'
                style={this.state.tab === 1 ? { border: "solid 3px red", opacity: 1 } : {}}
                onClick={() => {
                  this.setState({ tab: 1 }); // manage issues tab
                }}
              >
                MANAGING
              </div>
              <div
                className='admin-applications-tab-button'
                style={this.state.tab === 2 ? { border: "solid 3px red", opacity: 1 } : {}}
                onClick={() => {
                  this.setState({ tab: 2 }); // resolved issues tab
                }}
              >
                RESOLVED ISSUES
              </div>
            </div>
            {/* search field on mobile devices */}
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
                        // function to ban the user
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
            <div
              style={this.state.tab === 1 || this.state.tab === 2 ? { display: "none" } : {}}
              className='admin-applications-applications'
            >
              {this.state.newIssues.map((item) => (
                <ApplicationCard app={item} pageNo={1} updateIssues={this.updateIssues} />
              ))}
            </div>
            <div
              style={this.state.tab === 0 || this.state.tab === 2 ? { display: "none" } : {}}
              className='admin-applications-applications'
            >
              {this.state.manage.map((item) => (
                <ApplicationCard app={item} pageNo={2} updateIssues={this.updateIssues} />
              ))}
            </div>
            <div
              style={this.state.tab === 0 || this.state.tab === 1 ? { display: "none" } : {}}
              className='admin-applications-applications'
            >
              {this.state.resolvedIssues.map((item) => (
                <ApplicationCard app={item} pageNo={3} updateIssues={this.updateIssues} />
              ))}
            </div>
          </div>
          {/* search field on desktop devices */}
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
              <div>{this.state.searchResultText !== "" ? `Search results for \"${this.state.searchResultText}\"` : ""}</div>
              {this.state.searchResults.map((user, i) => (
                <div className='admin-applications-search-results-card' style={{ background: i % 2 == 0 ? "#E8DEE5" : "#F9F6F8" }}>
                  <div>
                    <div style={{ fontWeight: "bold" }}>{user.name}</div>
                    <div>{user.phone}</div>
                  </div>
                  <div
                    onClick={(event) => {
                      // function to ban the user
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

export default AdminHomePage;

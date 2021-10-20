//@ts-check

import React from "react";
import AdminNavbar from "../Navbar/admin-navbar";
import "./admin-applications.css";
import TextField from "@mui/material/TextField";
import { IoBan } from "react-icons/io5";
import { styled } from "@mui/material/styles";

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

const openApp = [
  {
    name: "Arvind",
    phone: "1234567890",
    email: "abc@gmail.com",
    subjects: ["HIN10", "MAT10", "SOC9"],
    language: "hindi",
    timeSlot: "morning",
  },
  {
    name: "Raj kumar",
    phone: "1234567890",
    email: "abc@gmail.com",
    subjects: ["HIN10", "MAT10", "SOC9"],
    language: "hindi",
    timeSlot: "morning",
  },
];

const rejApp = [
  {
    name: "Aashrith",
    phone: "1234567890",
    email: "abc@gmail.com",
    subjects: ["HIN10", "MAT10", "SOC9"],
    language: "hindi",
    timeSlot: "morning",
  },
  {
    name: "Anil",
    phone: "1234567890",
    email: "abc@gmail.com",
    subjects: ["HIN10", "MAT10", "SOC9"],
    language: "hindi",
    timeSlot: "morning",
  },
];

const ApplicationCard = (props) => {
  const handleApprove = (user) => {
    console.log("approve ", user.name);
  };
  const handleReject = (user) => {
    console.log("reject ", user.name);
  };

  return (
    <div className="admin-applications-card">
      <div className="admin-applications-card-row1">
        <div>{props.app.name}</div>
        <div>{props.app.phone}</div>
      </div>
      <div className="admin-applications-card-row2">
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
          {props.app.subjects.map((sub) => (
            <div style={{ marginLeft: "2vw" }}>{sub}</div>
          ))}
        </div>
      </div>

      <div className="admin-applications-card-row3">
        <div
          className="admin-applications-card-button"
          onClick={() => {
            handleApprove(props.app);
          }}
          style={props.rej ? { display: "none" } : {}}
        >
          APPROVE
        </div>
        <div
          className="admin-applications-card-button"
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

class AdminApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      searchText: "",
      searchResultText: "",
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
    this.handleBanUser = this.handleBanUser.bind(this);
  }

  handleSearchTextChange(e) {
    this.setState({ searchText: e.target.value });
  }

  handleSubmitText(e) {
    if (e.keyCode === 13) {
      console.log(this.state.searchText);
      this.setState({ searchResultText: this.state.searchText });
      // submit this search text to Backend for Query
    }
  }

  handleBanUser(user) {
    console.log("ban ", user.name);
  }

  componentDidMount() {
    if (
      localStorage.getItem("isloggedin") === null ||
      localStorage.getItem("isloggedin") === "false"
    ) {
      // window.location='/admin-auth'
    }
  }

  render() {
    return (
      <div>
        <AdminNavbar />
        <div className="admin-main">
          <div className="admin-applications-leftbox">
            <div className="admin-applications-tab-switcher">
              <div
                className="admin-applications-tab-button"
                style={
                  this.state.tab == 0
                    ? { border: "solid 3px red", opacity: 1 }
                    : {}
                }
                onClick={() => {
                  this.setState({ tab: 0 });
                }}
              >
                OPEN APPLICATIONS
              </div>
              <div
                className="admin-applications-tab-button"
                style={
                  this.state.tab == 1
                    ? { border: "solid 3px red", opacity: 1 }
                    : {}
                }
                onClick={() => {
                  this.setState({ tab: 1 });
                }}
              >
                REJECTED APPLICATIONS
              </div>
            </div>
            <div className="admin-applications-right-box-phone">
              <CssTextField
                id="outlined-basic"
                label="🔍Search for User by Name or Phone Number"
                variant="outlined"
                value={this.state.searchText}
                onChange={this.handleSearchTextChange}
                onKeyUp={this.handleSubmitText}
              />
              <div className="admin-applications-search-results">
                <div>
                  {this.state.searchResultText !== ""
                    ? `Search results for \"${this.state.searchResultText}\"`
                    : ""}
                </div>
                {/* {newIssues.map((user, i) => (
                                    <div
                                        className='admin-applications-search-results-card'
                                        style={{ background: i % 2 == 0 ? "#E8DEE5" : "#F9F6F8" }}
                                    >
                                        <div>
                                            <div>{user.name}</div>
                                            <div>{user.phone}</div>
                                        </div>
                                        <div onClick={() => {}}>
                                            BAN USER
                                            <IoBan style={{ color: "red", marginLeft: "1vw" }} />
                                        </div>
                                    </div>
                                ))}{" "} */}
              </div>
            </div>
            <div
              style={this.state.tab == 1 ? { display: "none" } : {}}
              className="admin-applications-applications"
            >
              {openApp.map((item) => (
                <ApplicationCard app={item} />
              ))}
            </div>
            <div
              style={this.state.tab == 0 ? { display: "none" } : {}}
              className="admin-applications-applications"
            >
              {rejApp.map((item) => (
                <ApplicationCard app={item} rej={true} />
              ))}
            </div>
          </div>
          <div className="admin-applications-right-box">
            <CssTextField
              id="outlined-basic"
              label="🔍Search for User by Name or Phone Number"
              variant="outlined"
              value={this.state.searchText}
              onChange={this.handleSearchTextChange}
              onKeyUp={this.handleSubmitText}
            />
            <div className="admin-applications-search-results">
              <div>
                {this.state.searchResultText != ""
                  ? `Search results for \"${this.state.searchResultText}\"`
                  : ""}
              </div>
              {
                /* dummy data */
                openApp.map((user, i) => (
                  <div
                    className="admin-applications-search-results-card"
                    style={{ background: i % 2 == 0 ? "#E8DEE5" : "#F9F6F8" }}
                  >
                    <div>
                      <div>{user.name}</div>
                      <div>{user.phone}</div>
                    </div>
                    <div
                      onClick={() => {
                        this.handleBanUser(user);
                      }}
                    >
                      BAN USER
                      <IoBan style={{ color: "red", marginLeft: "1vw" }} />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminApplications;

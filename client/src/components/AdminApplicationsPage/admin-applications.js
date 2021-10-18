import React from "react";
import AdminNavbar from "../Navbar/admin-navbar";
import "./admin-applications.css";

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
        <div className="admin-applications-card-button">APPROVE</div>
        <div className="admin-applications-card-button">DISAPPROVE</div>
      </div>
    </div>
  );
};

class AdminApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
    };
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
                <ApplicationCard app={item} />
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default AdminApplications;

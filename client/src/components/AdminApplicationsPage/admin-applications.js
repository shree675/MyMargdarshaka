import React from "react";
import AdminNavbar from "../Navbar/admin-navbar";
import "./admin-applications.css";

const data = [
  {
    name: "Name1",
    phone: "1234567890",
    email: "abc@gmail.com",
    details: ".....................................",
    subjects: ["hindi", "maths", "socail"],
    languages: ["hindi", "english"],
    timeSlots: ["morning", "afternoon"],
  },
  {
    name: "Name2",
    phone: "1234567890",
    email: "abc@gmail.com",
    details: ".....................................",
    subjects: ["hindi", "maths", "socail"],
    languages: ["hindi", "english"],
    timeSlots: ["morning", "afternoon"],
  },
];

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
            <div className="admin-application-tab-switcher">
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
            <div className="admin-applications-box">
              {data.map((item) => (
                <div>{item.name}</div>
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

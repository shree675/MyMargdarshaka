// @ts-check

import React, { useState } from "react";
import axios from "axios";

import Card from "./card";
import ProgressChart from "./progress-chart";
import Navbar from "../Navbar/learner-navbar";
import data from "../../data";
import { verify } from "../../verifyUser";

const borderStyle = { borderColor: "#ff0000", borderRadius: "20px" };

const LearnerHome = (props) => {
  const [mentorData, setMentorData] = React.useState([]);
  const [_, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");

  // used to queru data and sets the state
  const getData = async (learner_phone) => {
    const res = await axios.get(`/api/learner/get-data/phone/${learner_phone}`);
    const subjects = res.data.subjects;

    let mentor_data = [];

    for (let i = 0; i < subjects.length; i++) {
      const sub = subjects[i];
      if (sub.mentor_id === "-1") continue;
      const res = await axios(`/api/mentor/get-data/id/${sub.mentor_id}`);
      const mentor = res.data;
      let temp = {};
      const code = sub.code;
      temp.subject = data.codeToSubName[code.substring(0, code.length - 1)];
      temp.name = mentor.name;
      temp.Class = Number(code[code.length - 1]);
      temp.email = mentor.email;
      temp.phone = mentor.phone;
      temp.hasPendingTests = false;
      temp.hasConsented = true;

      mentor_data.push(temp);
    }

    console.log(mentor_data);
    setMentorData(mentor_data);
  };

  React.useEffect(() => {
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "mentor"
    ) {
      window.location = "/my-students";
    } else if (
      localStorage.getItem("isloggedin") !== null &&
      localStorage.getItem("isloggedin") !== undefined &&
      localStorage.getItem("isloggedin") === "true"
    ) {
      window.location = "/admin-home";
    }
    verify(setCuruser, setPhone);
    getData(phone);
  }, [phone]);

  React.useEffect(() => {
    console.log(mentorData);
  }, [mentorData]);

  return (
    <div className="learner-home">
      <Navbar />
      <div className="container-fluid p-0">
        <div className="row m-3" style={borderStyle}>
          <div
            className="col-md card p-3 me-md-2 mb-3 mb-md-0"
            style={borderStyle}
          >
            <h1>
              <strong>MENTORS</strong>
            </h1>
            <div className="row">
              {mentorData.map((mentorDetails, i) => {
                return (
                  <div key={i} className="col-8 mx-auto col-sm-6 mx-md-0">
                    <Card details={mentorDetails} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md card p-3" style={borderStyle}>
            <h1 className="mb-3">
              <strong>YOUR PROGRESS</strong>
            </h1>
            <div className="row mb-3">
              <div className="col">
                <ProgressChart percent_complete={10} subject={"Mathematics"} />
              </div>
              <div className="col">
                <ProgressChart
                  percent_complete={20}
                  subject={"Social Studies"}
                />
              </div>
              <div className="col">
                <ProgressChart percent_complete={30} subject={"Science"} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ProgressChart percent_complete={40} subject={"Biology"} />
              </div>
              <div className="col">
                <ProgressChart percent_complete={50} subject={"Chemistry"} />
              </div>
              <div className="col">
                <ProgressChart percent_complete={60} subject={"Physics"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerHome;

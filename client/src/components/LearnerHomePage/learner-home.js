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
  // const mentorDetails = props.mentorDetails
  // mentorDetails is an array that contains information
  // about each mentor in the following format

  // TODO: Update with mentorDetails

  // this is temp, get this id from props
  let id = "6174edaeb2244a7f509c8a25";

  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");
  const [mentorData, setMentorData] = React.useState([]);

  /*
  const verify = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCuruser(user.uid); // user.uid is the unique identifier of the user
        // alert("You are logged in as " + user.uid);
        setPhone(user.phoneNumber);
        //console.log(user.phoneNumber);
      } else {
        setCuruser("No user found");
      }
    });
    console.log(curuser);
  };
  */

  const getData = async () => {
    const res = await axios.get(`/api/learner/get-data/id/${id}`);
    const subjects = res.data.subjects;

    let mentor_data = [];

    for (let i = 0; i < subjects.length; i++) {
      const sub = subjects[i];
      const res = await axios(`/api/mentor/get-data/${sub.mentor_id}`);
      const mentor = res.data;
      let temp = {};
      const code = sub.code;
      temp.subject = data.codeToSubName[code.substring(0, code.length - 1)];
      temp.name = mentor.name;
      temp.class = Number(code[code.length - 1]);
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
    verify(setCuruser, setPhone);
    getData();
  }, []);

  React.useEffect(() => {
    console.log(mentorData);
  }, [mentorData]);

  /*
  const details = {
    subject: "MATHEMATICS",
    name: "Inderpal Ankur",
    class: 9,
    email: "abc@example.com",
    phone: "9876543210",
    hasPendingTests: false,
    hasConsented: true,
  };
  */

  /*
  const num_mentors = 6;

  var cards = [];
  for (let i = 0; i < num_mentors; i++) {
    cards.push(
      <div key={i} className="col-8 mx-auto col-sm-6 mx-md-0">
        <Card details={mentorData[i]} />
      </div>
    );
  }
  */

  return (
    <div className='learner-home'>
      <Navbar />
      <div className='container-fluid p-0'>
        <div className='row m-3' style={borderStyle}>
          <div className='col-md card p-3 me-md-2 mb-3 mb-md-0' style={borderStyle}>
            <h1>
              <strong>MENTORS</strong>
            </h1>
            <div className='row'>
              {mentorData.map((mentorDetails, i) => {
                return (
                  <div key={i} className='col-8 mx-auto col-sm-6 mx-md-0'>
                    <Card details={mentorDetails} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className='col-md card p-3' style={borderStyle}>
            <h1 className='mb-3'>
              <strong>YOUR PROGRESS</strong>
            </h1>
            <div className='row mb-3'>
              <div className='col'>
                <ProgressChart />
              </div>
              <div className='col'>
                <ProgressChart />
              </div>
              <div className='col'>
                <ProgressChart />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <ProgressChart />
              </div>
              <div className='col'>
                <ProgressChart />
              </div>
              <div className='col'>
                <ProgressChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerHome;

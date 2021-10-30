//@ts-check

import React, { useEffect, useState } from "react";
import axios from "axios";
import LearnerDashboardEditAttributes from "./learner-edit-attributes";
import LearnerDashboardChangeDetails from "./learner-dashboard-change-details";
import NIOSStatus from "./nios-status";
import LearnerNavbar from "../Navbar/learner-navbar";
import LearnerRequestChangeOfMentor from "./learner-change-mentor";
import { verify } from "../../verifyUser";
import "./learner-dashboard.css";

// main page component
const LearnerDashboard = () => {
  // this id should be passed through props
  //let learner_id = "6174edaeb2244a7f509c8a25";
  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");
  const [learnerData, setLearnerData] = useState({});

  // method to retrieve user's details from database
  const getData = async (learner_phone) => {
    console.log(learner_phone);
    axios
      .get(`/api/learner/get-data/phone/${learner_phone}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.phone != null || data.phone != undefined) {
          setLearnerData(data);
        }
      })
      .catch((e) => console.log("VERY BAD ERROR"));
  };

  // verify if a user has already logged in
  useEffect(() => {
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

  return (
    <div className='mb-3'>
      <LearnerNavbar />
      <div className='learner-curvature'></div>
      <div className='container-fluid'>
        <div className='row align-items-end'>
          <div className='col-lg-3 col-12'>
            <LearnerDashboardChangeDetails details={learnerData} />
          </div>
          <div className='col-lg-9 col-12'>
            <LearnerDashboardEditAttributes details={learnerData} />
          </div>
        </div>
        <NIOSStatus details={learnerData} />
        <LearnerRequestChangeOfMentor />
      </div>
    </div>
  );
};

export default LearnerDashboard;

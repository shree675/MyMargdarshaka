//@ts-check

import React, { useEffect, useState } from "react";
import axios from "axios";
import LearnerDashboardEditAttributes from "./learner-edit-attributes";
import LearnerDashboardChangeDetails from "./learner-dashboard-change-details";
import NIOSStatus from "./nios-status";
import LearnerNavbar from "../Navbar/learner-navbar";
import LearnerRequestChangeOfMentor from "./learner-change-mentor";
import { verify } from "../../verifyUser";

const LearnerDashboard = () => {
  // this id should be passed through props
  //let learner_id = "6174edaeb2244a7f509c8a25";
  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");
  const [learnerData, setLearnerData] = useState({});

  const getData = async (learner_phone) => {
    //const res = await axios.get(`/api/learner/get-data/phone/${learner_phone}`);
    //const data = res.data;
    axios.get(`/api/learner/get-data/phone/${learner_phone}`)
    .then((res) => {
      const data = res.data
      console.log(data);
      setLearnerData(data);
    })
 
  };

  useEffect(() => {
    verify(setCuruser, setPhone);
    //const learner_phone = localStorage.getItem("user_phone");
    getData(phone);
  }, [phone]);

  return (
    <div className="mb-3">
      <LearnerNavbar />
      <div className="container-fluid">
        <div className="row align-items-end">
          <div className="col-lg-3 col-12">
            <LearnerDashboardChangeDetails details={learnerData} />
          </div>
          <div className="col-lg-9 col-12">
            <LearnerDashboardEditAttributes details={learnerData} />
          </div>
        </div>
        <NIOSStatus />
        <LearnerRequestChangeOfMentor />
      </div>
    </div>
  );
};

export default LearnerDashboard;

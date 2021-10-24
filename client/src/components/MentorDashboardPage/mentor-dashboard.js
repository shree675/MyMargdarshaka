// @ts-check

import React, { useState, useEffect } from "react";
import LearnerDashboardEditAttributes from "../LearnerDashboardPage/learner-edit-attributes";
import LearnerDashboardChangeDetails from "../LearnerDashboardPage/learner-dashboard-change-details";
import Navbar from "../Navbar/mentor-navbar";
import { verify } from "../../verifyUser";

const MentorDashBoard = () => {
  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    verify(setCuruser, setPhone);
  }, []);

  return (
    <div className='mb-3'>
      <Navbar />
      <div className='container'>
        <div className='row align-items-end'>
          <div className='col-xl-3 col-12'>
            <LearnerDashboardChangeDetails />
          </div>
          <div className='col-xl-9 col-12'>
            <LearnerDashboardEditAttributes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashBoard;

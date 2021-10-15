// @ts-check

import React from "react";
import LearnerDashboardEditAttributes from "../LearnerDashboardPage/learner-edit-attributes";
import LearnerDashboardChangeDetails from "../LearnerDashboardPage/learner-dashboard-change-details";
import Navbar from "../Navbar/mentor-navbar";

const MentorDashBoard = () => {
  return (
    <div className="mb-3">
      <Navbar />
      <div className="container">
        <div className="row">
          <LearnerDashboardChangeDetails />
          <LearnerDashboardEditAttributes />
        </div>
      </div>
    </div>
  );
};

export default MentorDashBoard;

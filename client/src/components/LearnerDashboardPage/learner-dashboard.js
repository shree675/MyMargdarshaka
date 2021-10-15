import React from "react";
import LearnerDashboardEditAttributes from "./learner-edit-attributes";
import LearnerDashboardChangeDetails from "./learner-dashboard-change-details";
import NIOSStatus from "./nios-status";
import LearnerNavbar from "../Navbar/learner-navbar";
import LearnerRequestChangeOfMentor from "./learner-change-mentor";

const LearnerDashboard = () => {
  return (
    <div className="mb-3">
      <LearnerNavbar />
      <div className="container">
        <div className="row">
          <LearnerDashboardChangeDetails />
          <LearnerDashboardEditAttributes />
        </div>
        <NIOSStatus />
        <LearnerRequestChangeOfMentor />
      </div>
    </div>
  );
};

export default LearnerDashboard;

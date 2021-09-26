import React from "react";
import LearnerDashboardEditAttributes from "./learner-edit-attributes";
import LearnerDashboardChangeDetails from "./learner-dashboard-change-details";
import NIOSStatus from "./nios-status";

const LearnerDashboard = () => {
  return (
    <div className="">
      <LearnerDashboardChangeDetails />
      <LearnerDashboardEditAttributes />
      <NIOSStatus />
    </div>
  );
};

export default LearnerDashboard;

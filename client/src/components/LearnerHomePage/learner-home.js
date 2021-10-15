// @ts-check

import React from "react";
import Card from "./card";
import ProgressChart from "./progress-chart";
import Navbar from "../Navbar/learner-navbar";

const borderStyle = { borderColor: "#ff0000", borderRadius: "20px" };

const LearnerHome = (props) => {
  // const mentorDetails = props.mentorDetails
  // mentorDetails is an array that contains information
  // about each mentor in the following format

  // TODO: Update with mentorDetails

  const details = {
    subject: "MATHEMATICS",
    name: "Inderpal Ankur",
    class: 9,
    email: "abc@example.com",
    phone: "9876543210",
    hasPendingTests: false,
    hasConsented: true,
  };

  const num_mentors = 6;

  var cards = [];
  for (let i = 0; i < num_mentors; i++) {
    cards.push(
      <div className="col-6">
        <Card details={details} />
      </div>
    );
  }

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
            <div className="row">{cards}</div>
          </div>
          <div className="col-md card p-3" style={borderStyle}>
            <h1 className="mb-3">
              <strong>YOUR PROGRESS</strong>
            </h1>
            <div className="row mb-3">
              <div className="col">
                <ProgressChart />
              </div>
              <div className="col">
                <ProgressChart />
              </div>
              <div className="col">
                <ProgressChart />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ProgressChart />
              </div>
              <div className="col">
                <ProgressChart />
              </div>
              <div className="col">
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

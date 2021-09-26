import React from "react";
import Card from "./card";
import ProgressChart from "./progress-chart";

const borderStyle = { borderColor: "#ff0000", borderRadius: "20px" };

const LearnerHome = () => {
  return (
    <div className="container-fluid">
      <div className="row m-3" style={borderStyle}>
        <div className="col-6 card p-3" style={borderStyle}>
          <h1>
            <strong>MENTORS</strong>
          </h1>
          <div className="row">
            <div className="col">
              <Card />
            </div>
            <div className="col">
              <Card />
            </div>
          </div>
        </div>

        <div className="col-6 card p-3" style={borderStyle}>
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
  );
};

export default LearnerHome;

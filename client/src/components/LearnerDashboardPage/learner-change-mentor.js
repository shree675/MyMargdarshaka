// @ts-check

import React from "react";
import SubjectTitle from "./subject-title";
import Card from "../LearnerHomePage/card";

const LearnerRequestChangeOfMentor = () => {
  const style = {
    backgroundColor: "#5D1049",
    color: "white",
    borderRadius: "20px",
  };

  const subjects = ["MATHEMATICS", "SCIENCE", "ENGLISH"];
  const names = [
    "Zephoid Beeblebrox",
    "Arthur Dent",
    "Ford Prefect",
    "Trillian",
    "Prostetnic Volgon Jeltz",
  ];
  const details = [];

  for (var subject in subjects) {
    details.push({
      subject: subjects[subject],
      name: names[subject],
      class: 9,
      email: "abc@example.com",
      phone: "9876543210",
      hasPendingTests: false,
      hasConsented: true,
    });
  }

  return (
    <div
      className="request-change-of-mentor card p-3"
      style={{ border: "1px solid #FF0000", borderRadius: "20px" }}
    >
      <h1 className="mb-3" style={{ color: "#5D1049" }}>
        <strong>REQUEST CHANGE OF MENTORS</strong>
      </h1>

      <SubjectTitle style={style} subject="Mathematics" />

      <div className="row justify-content-center">
        <div className="card-width">
          <Card details={details[0]} />
        </div>
        <div className="card-width">
          <Card details={details[0]} />
        </div>
        <div className="card-width">
          <Card details={details[0]} />
        </div>
      </div>

      <SubjectTitle style={style} subject="Science" />

      <div className="row justify-content-center">
        <div className="card-width">
          <Card details={details[1]} />
        </div>
        <div className="card-width">
          <Card details={details[1]} />
        </div>
      </div>

      <SubjectTitle style={style} subject="English" />

      <div className="row justify-content-center">
        <div className="card-width">
          <Card details={details[2]} />
        </div>
        <div className="card-width">
          <Card details={details[2]} />
        </div>
        <div className="card-width">
          <Card details={details[2]} />
        </div>
      </div>
    </div>
  );
};

export default LearnerRequestChangeOfMentor;

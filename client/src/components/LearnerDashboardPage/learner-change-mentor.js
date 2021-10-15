// @ts-check

import React from "react";
import SubjectTitle from "../MentorHomePage/subject-title";
import Card from "../LearnerHomePage/card";

const LearnerRequestChangeOfMentor = () => {
  const style = {
    backgroundColor: "#5D1049",
    color: "white",
    borderRadius: "20px",
  };

  const details = {
    subject: "MATHEMATICS",
    name: "Inderpal Ankur",
    class: 9,
    email: "abc@example.com",
    phone: "9876543210",
    hasPendingTests: false,
    hasConsented: true,
  };

  return (
    <div
      className="request-change-of-mentor card p-3"
      style={{ borderRadius: "20px" }}
    >
      <h1 className="mb-3" style={{ color: "#5D1049" }}>
        <strong>REQUEST CHANGE OF MENTORS</strong>
      </h1>

      <SubjectTitle style={style} subject="Mathematics" />

      <div className="col-3">
        <Card details={details} />
      </div>

      <SubjectTitle style={style} subject="Science" />

      <div className="row">
        <div className="col-3">
          <Card details={details} />
        </div>
      </div>

      <SubjectTitle style={style} subject="English" />

      <div className="row">
        <div className="col-3">
          <Card details={details} />
        </div>
        <div className="col-3">
          <Card details={details} />
        </div>
        <div className="col-3">
          <Card details={details} />
        </div>
      </div>
    </div>
  );
};

export default LearnerRequestChangeOfMentor;

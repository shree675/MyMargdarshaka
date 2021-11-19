// @ts-check

import React from "react";
import SubjectTitle from "./subject-title";
import Card from "../LearnerHomePage/card";

const LearnerRequestChangeOfMentor = ({ details, changeMentor }) => {
  const style = {
    backgroundColor: "#5D1049",
    color: "white",
    borderRadius: "20px",
  };

  /*
  const subjects = ["MATHEMATICS", "SCIENCE", "ENGLISH"];
  const names = ["Zephoid Beeblebrox", "Arthur Dent", "Ford Prefect", "Trillian", "Prostetnic Volgon Jeltz"];
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
      is_banned: false,
    });
  }
  */

  return (
    <div
      className="request-change-of-mentor card p-3"
      style={{ border: "1px solid #FF0000", borderRadius: "20px" }}
    >
      <h1 className="mb-3" style={{ color: "#5D1049" }}>
        <strong>REQUEST CHANGE OF MENTORS</strong>
      </h1>

      {details.subjects &&
        details.subjects.map((sub) => (
          <SubjectTitle
            style={style}
            classCode={sub.code}
            changeMentor={changeMentor}
          />
        ))}
    </div>
  );
};

export default LearnerRequestChangeOfMentor;

// @ts-check

import React from "react";

// @ts-ignore
import { ReactComponent as ReassignMentors } from "../../assets/reassign_mentors.svg";
import data from "../../data";
// import refresh from "../../assets/reassign_mentors.svg";
// import "./mentor-home.css";

const SubjectTitle = ({ style, classCode, changeMentor }) => {
  const handleChangeMentor = (e) => {
    const ok = window.confirm(
      "\nNOTE : DO NOT CHANGE THE MENTOR UNLESS NECESSARY\nAre you sure you want to change the mentor?"
    );
    if (!ok) return;
    //console.log("subject : ", data.getSubjectName(classCode));
    changeMentor(data.getSubjectName(classCode));
  };
  return (
    <div className="card p-3 col-12 mb-3" style={style}>
      <div className="row justify-content-between">
        <div className="col-10">
          <h4>
            {data.getSubjectName(classCode) +
              " " +
              data.getClassNumber(classCode)}
          </h4>
        </div>
        <button
          className="col-1 me-3"
          style={{ background: "none", border: "none" }}
        >
          <div onClick={handleChangeMentor}>
            <ReassignMentors />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SubjectTitle;

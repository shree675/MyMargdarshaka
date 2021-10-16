// @ts-check

import React from "react";

// @ts-ignore
import { ReactComponent as ReassignMentors } from "../../assets/reassign_mentors.svg";

const SubjectTitle = (props) => {
  return (
    <div className="card p-3 col-12 mb-3" style={props.style}>
      <div className="row justify-content-between">
        <div className="col-10">
          <h4>{props.subject}</h4>
        </div>
        <button
          className="col-1 align-items-end me-2"
          style={{ background: "none", border: "none" }}
        >
          <ReassignMentors />
        </button>
      </div>
    </div>
  );
};

export default SubjectTitle;

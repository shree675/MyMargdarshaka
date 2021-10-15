// @ts-check

import React from "react";

const SubjectTitle = (props) => {
  return (
    <div className="card p-3 col-12 mb-3" style={props.style}>
      <h4>{props.subject}</h4>
    </div>
  );
};

export default SubjectTitle;

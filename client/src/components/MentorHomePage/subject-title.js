// @ts-check

import React from "react";

// @ts-ignore
import data from "../../data";
// import refresh from "../../assets/reassign_mentors.svg";
// import "./mentor-home.css";

const SubjectTitle = (props) => {
  return (
    <div className="card p-3 col-12 mb-3" style={props.style}>
      <div className="row justify-content-between">
        <div className="col-10">
          <h4>
            {data.getSubjectName(props.classCode) +
              " " +
              data.getClassNumber(props.classCode)}
          </h4>
        </div>
        <button
          className="col-1 me-3"
          style={{ background: "none", border: "none" }}
        ></button>

        <a
          className={"btn btn-warning text-white "}
          onClick={() => {
            props.setPageDetails({
              pageName: "sub",
              details: {
                ...props.details,
                subject:
                  data.getSubjectName(props.classCode) +
                  " " +
                  props.classCode[props.classCode.length - 1],
              },
            });
          }}
        >
          <b>Details</b>
        </a>
      </div>
    </div>
  );
};

export default SubjectTitle;

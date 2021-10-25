import { times } from "lodash";
import React, { useState, useEffect } from "react";

import data from "../../data";

function getSubjectName(code) {
  code = code.substr(0, code.length - 1);
  const subName = data.codeToSubName[code];
  return subName;
}

const details = {
  name: "Aashrith",
  phone: "9876543214",
  email: "aashrith@gmail.com",
  time: "Afternoon",
  language: "Hindi",
  classes: {
    6: ["Hindi"],
    7: ["English"],
    8: ["Telugu"],
    9: ["Science"],
    10: ["Social"],
    11: ["Physics"],
    12: ["Biology"],
  },
};

const LearnerDashboardEditAttributes = () => {
  return (
    <div
      className="container p-xl-0 card mx-auto mt-3 mx-xl-0"
      style={{ border: "1px solid #ff0000", borderRadius: "20px" }}
    >
      <div className="row justify-content-center mt-4 px-5">
        {Object.keys(details.classes).map((cls) => (
          <div className="col-md-4 my-md-3" style={{ color: "#5D1049" }}>
            <strong>CLASS {cls}</strong>
            <ul className="list-group" id="preferred-subjects">
              {cls <= 10
                ? data.primSubs.map((sub) => (
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        checked={details.classes[cls].includes(sub)}
                      />
                      {sub}
                    </li>
                  ))
                : data.secSubs.map((sub) => (
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        checked={details.classes[cls].includes(sub)}
                      />
                      {sub}
                    </li>
                  ))}
            </ul>
          </div>
        ))}

        <div className="col-md-4 my-3" style={{ color: "#5D1049" }}>
          <strong>PREFERRED TIME</strong>
          <ul className="list-group" id="preferred-subjects">
            {data.times.map((timeSlot) => (
              <li className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name="time"
                  checked={timeSlot === details.time}
                />
                {timeSlot}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 col-12 my-3" style={{ color: "#5D1049" }}>
          <strong>PREFERRED LANGUAGES</strong>
          <ul className="list-group" id="preferred-subjects">
            {data.langs.map((lang) => (
              <li className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name="language"
                  checked={lang === details.language}
                />
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center">
        <a
          className="rounded-pill btn px-3 mb-3"
          style={{ border: "none", backgroundColor: "#5D1049", color: "white" }}
        >
          SAVE
        </a>
      </div>
    </div>
  );
};

export default LearnerDashboardEditAttributes;

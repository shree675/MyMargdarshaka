//@ts-check
import { times } from "lodash";
import axios from "axios";
import React, { useState, useEffect } from "react";

import data from "../../data";

function getSubjectName(code) {
  let classNumber = Number(code[code.length - 1]);
  if (classNumber <= 2) {
    code = code.substr(0, code.length - 2);
  } else {
    code = code.substr(0, code.length - 1);
  }
  const subName = data.codeToSubName[code];
  return subName;
}

// dummy data
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

const LearnerDashboardEditAttributes = ({ details }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    if (Object.keys(details).length > 0) {
      let tmp = { 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] };
      if (details.Classes)
        details.Classes.forEach((cls) => {
          const code = cls.code;

          let classNumber = Number(code[code.length - 1]);
          if (classNumber <= 2) {
            classNumber = Number(code.substr(code.length - 2, 2));
          }

          const subName = getSubjectName(code);

          if (tmp[classNumber] == undefined) {
            tmp[classNumber] = [subName];
          } else {
            tmp[classNumber].push(subName);
          }
        });
      tmp.time = details.time;
      tmp.language = details.language;
      setState(tmp);
    }
  }, [details]);

  const handleChangeAttr = (e) => {
    if (e.target.name === "time") {
      setState({ ...state, time: e.target.value });
    } else if (e.target.name === "language") {
      setState({ ...state, language: e.target.value });
    }
  };

  const handleClickSave = async (e) => {
    await axios.post(
      `/api/mentor/update-by-id/${details._id}`,
      {
        time: state.time,
        language: state.language,
      },
      {
        headers: { Authorization: `Bearer ${details.curuser}` },
      }
    );
  };

  return (
    <div
      className="container p-xl-0 card mx-auto mt-3 mx-xl-0"
      style={{ border: "1px solid #ff0000", borderRadius: "20px" }}
    >
      <div className="row justify-content-center mt-4 px-5">
        {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
          <div className="col-md-4 my-md-3" style={{ color: "#5D1049" }}>
            <strong>CLASS {cls}</strong>
            <ul className="list-group" id="preferred-subjects">
              {cls <= 10
                ? data.primSubs.map((sub) => (
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        checked={state[cls] ? state[cls].includes(sub) : false}
                      />
                      {sub}
                    </li>
                  ))
                : data.secSubs.map((sub) => (
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        checked={state[cls] ? state[cls].includes(sub) : false}
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
                  value={timeSlot}
                  checked={timeSlot === state.time}
                  onChange={handleChangeAttr}
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
                  value={lang}
                  checked={lang === state.language}
                  onChange={handleChangeAttr}
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
          onClick={handleClickSave}
        >
          SAVE
        </a>
      </div>
    </div>
  );
};

export default LearnerDashboardEditAttributes;

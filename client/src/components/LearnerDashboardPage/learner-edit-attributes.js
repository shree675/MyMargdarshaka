import React, { useState, useEffect } from "react";
import axios from "axios";

import data from "../../data";

const LearnerDashboardEditAttributes = ({ details }) => {
  let copyOfSubjects = {};

  const [subjects, setSubjects] = useState({});
  const [times, setTimes] = useState({});
  const [language, setLanguage] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "language") {
      console.log(e.target.value);
      setLanguage(e.target.value);
    } else {
      let [name, attr] = e.target.name.split("-");
      if (name == "subjects") {
        setSubjects({ ...subjects, [attr]: e.target.checked });
      } else if (name == "timeslots") {
        setTimes({ ...times, [attr]: e.target.checked });
      }
    }
  };

  const handleClick = async () => {
    console.log("clicked");

    //if (JSON.stringify(copyOfSubjects) != JSON.stringify(subjects)) {
    //}

    Object.keys(subjects).forEach((subName) => {
      if (subjects[subName] && !copyOfSubjects[subName]) {
        // added a subject
      } else if (!subjects[subName] && copyOfSubjects[subName]) {
        // removed a subject
      }
    });

    const times_array = Object.keys(times).filter((key) => times[key]);

    await axios.post(`/api/learner/update/id/${details._id}`, {
      ...details,
      times: times_array,
      language,
    });
  };

  useEffect(() => {
    if (Object.keys(details).length > 0) {
      console.log(details);
      let tmp = {};
      details.subjects.forEach((sub) => {
        const code = sub.code;
        const subName = data.codeToSubName[code.substr(0, code.length - 1)];
        tmp[subName] = true;
      });
      setSubjects(tmp);
      // maintaing a copy of subjects, if new subjects added then run matching algo
      copyOfSubjects = tmp;

      tmp = {};
      details.times.map((timeSlot) => {
        tmp[timeSlot] = true;
      });

      setTimes(tmp);
      setLanguage(details.language);
    }
  }, [details]);

  return (
    <div
      className="container p-xl-0 card mx-auto mt-3 mx-xl-0"
      style={{ border: "1px solid #ff0000", borderRadius: "20px" }}
    >
      <div className="row justify-content-center mt-4">
        <div className="col-md-4 my-md-3" style={{ color: "#5D1049" }}>
          <strong>ADD OR REMOVE SUBJECTS</strong>
          <ul className="list-group" id="preferred-subjects">
            {details.Class <= 10
              ? data.primSubs.map((sub) => (
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      name={`subjects-${sub}`}
                      checked={subjects[sub]}
                      onChange={handleChange}
                    />
                    {sub}
                  </li>
                ))
              : data.secSubs.map((sub) => (
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      name={`subjects-${sub}`}
                      checked={subjects[sub]}
                      onChange={handleChange}
                    />
                    {sub}
                  </li>
                ))}
          </ul>
        </div>

        <div className="col-md-4 my-3" style={{ color: "#5D1049" }}>
          <strong>PREFERRED TIMES</strong>
          <ul className="list-group" id="preferred-subjects">
            {data.times.map((timeSlot) => (
              <li className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  name={`timeslots-${timeSlot}`}
                  checked={times[timeSlot]}
                  onChange={handleChange}
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
                  checked={language === lang}
                  onChange={handleChange}
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
          onClick={handleClick}
        >
          SAVE
        </a>
      </div>
    </div>
  );
};

export default LearnerDashboardEditAttributes;

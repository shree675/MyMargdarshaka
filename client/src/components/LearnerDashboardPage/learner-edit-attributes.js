import React, { useState, useEffect } from "react";
import axios from "axios";

import data from "../../data";

function getSubjectName(code) {
  code = code.substr(0, code.length - 1);
  const subName = data.codeToSubName[code];
  return subName;
}

const LearnerDashboardEditAttributes = ({ details }) => {
  const [copyOfSubjects, setCopyOfSubjects] = useState({});
  const [subjects, setSubjects] = useState({});
  const [times, setTimes] = useState({});
  const [language, setLanguage] = useState("");
  const [mentorsNotFoundFor, setMentorsNotFoundFor] = useState([]);

  const handleChange = (e) => {
    if (e.target.name == "language") {
      console.log(e.target.value);
      setLanguage(e.target.value);
    } else {
      let [name, attr] = e.target.name.split("-");
      if (name == "subjects") {
        setSubjects({ ...subjects, [attr]: e.target.checked });
        if (e.target.checked)
          setMentorsNotFoundFor(
            mentorsNotFoundFor.filter((sub) => sub != attr)
          );
      } else if (name == "timeslots") {
        setTimes({ ...times, [attr]: e.target.checked });
      }
    }

    console.log(copyOfSubjects);
  };

  const handleClick = async () => {
    console.log("clicked");

    const times_array = Object.keys(times).filter((key) => times[key]);

    let added_subjects = [];

    Object.keys(subjects).forEach((subName) => {
      if (subjects[subName] && !copyOfSubjects[subName]) {
        added_subjects.push({ code: data.codes[subName] + details.Class });
      }
    });

    console.log("newly added subjects : ", added_subjects);

    let removed_subjects = [];

    let new_subjects_array = details.subjects.filter((sub) => {
      const subName = getSubjectName(sub.code);
      if (!subjects[subName] && copyOfSubjects[subName]) {
        // removed a subject
        removed_subjects.push(sub);
        return false;
      }
      return true;
    });

    console.log(
      "new_subjects_array after removing subjects : ",
      new_subjects_array
    );

    // finding matches for newly added subjects
    const res = await axios.post(`/api/mentor/signup/findmatches/`, {
      ...details,
      times: times_array,
      language,
      subjects: added_subjects,
    });

    const mentor_ids = res.data;
    console.log(mentor_ids);

    // contains all the subjects for which mentor is not found
    let mentors_not_found_for = [];

    for (let i = 0; i < mentor_ids.length; i++) {
      if (mentor_ids[i] != -1) {
        new_subjects_array.push({
          code: added_subjects[i].code,
          mentor_id: mentor_ids[i],
          consent: false,
          chapters: data.default.chapters,
        });
      } else {
        console.log("mentor not found for ", added_subjects[i].code);
        mentors_not_found_for.push(getSubjectName(added_subjects[i].code));
      }
    }

    setMentorsNotFoundFor(mentors_not_found_for);

    console.log(
      "new_subjects_array after adding subjects : ",
      new_subjects_array
    );

    // updating learner table
    await axios.post(`/api/learner/update/id/${details._id}`, {
      ...details,
      times: times_array,
      language,
      subjects: new_subjects_array,
    });

    // updating mentors table
    for (let i = 0; i < mentor_ids.length; i++) {
      if (mentor_ids[i] != -1) {
        await axios.post(`/api/mentor/assign/update-by-id/${mentor_ids[i]}`, {
          class_code: added_subjects[i].code,
          learner_id: details._id,
        });
      }
    }

    // for all the removed subjects, removing learnerid from the corresponding mentors
    for (let i = 0; i < removed_subjects.length; i++) {
      await axios.post(
        `/api/mentor/remove-learner/${removed_subjects[i].mentor_id}`,
        {
          class_code: removed_subjects[i].code,
          learner_id: details._id,
        }
      );
    }
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
      setCopyOfSubjects(tmp);

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
                      checked={
                        subjects[sub] && !mentorsNotFoundFor.includes(sub)
                      }
                      onChange={handleChange}
                    />
                    {sub}
                    <br />
                    <span
                      style={
                        mentorsNotFoundFor.includes(sub)
                          ? { color: "red" }
                          : { display: "none" }
                      }
                    >
                      *mentor not found
                    </span>
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

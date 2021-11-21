//@ts-check

import React, { useEffect, useState } from "react";
import axios from "axios";
import LearnerDashboardEditAttributes from "./learner-edit-attributes";
import LearnerDashboardChangeDetails from "./learner-dashboard-change-details";
import NIOSStatus from "./nios-status";
import LearnerNavbar from "../Navbar/learner-navbar";
import LearnerRequestChangeOfMentor from "./learner-change-mentor";
import { verify } from "../../verifyUser";
import "./learner-dashboard.css";
import data from "../../data";

// main page component
const LearnerDashboard = () => {
  // this id should be passed through props
  //let learner_id = "6174edaeb2244a7f509c8a25";
  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");
  const [learnerData, setLearnerData] = useState({});

  // method to retrieve user's details from database
  const getData = async () => {
    if (!phone) return;
    console.log(curuser);
    if (curuser === "No user is logged in") return;
    axios
      .get(`/api/learner/get-data/phone/${phone}`, {
        headers: { Authorization: `Bearer ${curuser}` },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.phone != null || data.phone != undefined) {
          setLearnerData(data);
        }
      })
      .catch((e) => console.log("VERY BAD ERROR"));
  };

  // this function is passed into the child component
  const changeMentor = async (subject) => {
    console.log("change mentor for ", subject);
    const class_code = data.codes[subject] + learnerData.Class;

    let res = await axios.post(
      `/api/mentor/signup/findmatches/`,
      {
        language: learnerData.language,
        times: learnerData.times,
        subjects: [{ code: class_code }],
        type: "reassign",
      },
      {
        headers: { Authorization: `Bearer ${curuser}` },
      }
    );

    // getting the old mentor ID
    const oldMentorId = learnerData.subjects.filter(
      (sub) => sub.code == class_code
    )[0].mentor_id;
    console.log("old mentor : ", oldMentorId);

    // avoiding the old mentor
    let new_mentors = res.data.filter((m) => m != oldMentorId);

    if (new_mentors.length == 0 || new_mentors[0] == -1) {
      console.log("mentor not found");
      return;
    }

    // randomly choosing an index for new mentors
    let i = Math.floor(Math.random() * new_mentors.length);
    const newMentorId = new_mentors[i];
    console.log("new mentor : ", newMentorId);

    // removing the learner id from the old mentor
    await axios.post(
      `/api/mentor/remove-learner/${oldMentorId}`,
      { class_code: class_code, learner_id: learnerData._id },
      { headers: { Authorization: `Bearer ${curuser}` } }
    );

    // adding the learner id to the new mentor
    await axios.post(
      `/api/mentor/assign/update-by-id/${newMentorId}`,
      { class_code: class_code, learner_id: learnerData._id },
      { headers: { Authorization: `Bearer ${curuser}` } }
    );

    // updaing the learner with the new mentor
    let temp_sub = learnerData.subjects.filter((sub) => sub.code != class_code);
    temp_sub.push({
      code: class_code,
      mentor_id: newMentorId,
      chapters: data.default.chapters,
    });

    await axios.post(
      `/api/learner/update/id/${learnerData._id}`,
      { ...learnerData, subjects: temp_sub },
      { headers: { Authorization: `Bearer ${curuser}` } }
    );

    // displaying the alert showing
    // the new mentor details
    res = await axios.get(`/api/mentor/get-data/id/${newMentorId}`, {
      headers: { Authorization: `Bearer ${curuser}` },
    });
    console.log("new mentor : ", res.data.name);
    window.alert(
      `New mentor : \n Name - ${res.data.name}\n Phone - ${res.data.phone} \n    has been assigned for \"${subject}\".`
    );
  };

  // verify if a user has already logged in
  useEffect(() => {
    console.log("in dashboard");
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "mentor"
    ) {
      window.location = "/my-students";
    } else if (
      localStorage.getItem("isloggedin") !== null &&
      localStorage.getItem("isloggedin") !== undefined &&
      localStorage.getItem("isloggedin") === "true"
    ) {
      window.location = "/admin-home";
    }
    verify(setCuruser, setPhone);
    getData();
  }, [phone, curuser]);

  return (
    <div className="mb-3 learner-bg">
      <LearnerNavbar />
      <div className="learner-curvature"></div>
      <div className="container-fluid">
        <div className="row align-items-end">
          <div className="col-lg-3 col-12">
            <LearnerDashboardChangeDetails
              details={{ ...learnerData, curuser }}
            />
          </div>
          <div className="col-lg-9 col-12">
            <LearnerDashboardEditAttributes
              details={{ ...learnerData, curuser }}
            />
          </div>
        </div>
        <NIOSStatus details={learnerData} />
        <LearnerRequestChangeOfMentor
          details={learnerData}
          changeMentor={changeMentor}
        />
      </div>
    </div>
  );
};

export default LearnerDashboard;

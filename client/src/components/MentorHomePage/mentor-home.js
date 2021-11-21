// @ts-check

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mentor-home.css";
import Navbar from "../Navbar/mentor-navbar";
import Card from "../LearnerHomePage/card";
import MentorSubjectDetails from "../MentorSubjectDetailsPage/mentor-subject-details";
import SubjectTitle from "./subject-title";
import { verify } from "../../verifyUser";
/* import lola from "../../assets/lola_more_glow.gif"; */
import lola from "../../assets/lola_small_and_moves.gif";
import firebase from "../../firebase";

// main component
const MentorHome = () => {
  const style = {
    backgroundColor: "#5D1049",
    color: "white",
    borderRadius: "20px",
  };

  const details = {
    subject: "MATHEMATICS",
    name: "Inderpal Ankur",
    class: 9,
    email: "abc@example.com",
    phone: "9876543210",
    hasPendingTests: false,
    hasConsented: true,
  };

  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");

  // format : {"SCI6" : [{name: "Aashrith", ...}]}
  const [studentsData, setStudentsData] = useState({});
  const [pageDetails, setPageDetails] = useState({ pageName: "home" });

  // gets the data from DB and updates the state "studentsData"
  const getData = async () => {
    if (!phone) return;
    if (curuser === "No user is logged in") return;
    const res = await axios.get(`/api/mentor/get-data/phone/${phone}`, {
      headers: { Authorization: `Bearer ${curuser}` },
    });
    console.log(res.data);
    const mentor_id = res.data._id;
    const classes = res.data.Classes;

    if (res.data.is_banned) {
      alert("You have been banned. Please contact your administrator.");
      firebase.auth().signOut();
      localStorage.clear();
      window.location = "/init-signin";
    }

    // tmp object will store all the data and is used to update the state
    let tmp = {};

    // for each class code query students details and store
    for (let i = 0; i < classes.length; i++) {
      const code = classes[i].code;
      const students = classes[i].students;

      tmp[code] = [];

      // query data for each student of a class code and store
      console.log(code, students);
      for (let j = 0; j < students.length; j++) {
        const res = await axios.get(`/api/learner/get-data/id/${students[j].id}`, {
          headers: { Authorization: `Bearer ${curuser}` },
        });
        let student_data = res.data;
        console.log("students data", student_data);
        if (student_data != null) {
          student_data.learner_id = student_data._id;
          student_data.mentor_id = mentor_id;
          student_data.is_banned = student_data.is_banned;
        }
        tmp[code].push(student_data);
      }
    }

    // set the state
    setStudentsData(tmp);
  };

  // reroute if a different user is logged in
  useEffect(() => {
    if (
      localStorage.getItem("userType") !== null &&
      localStorage.getItem("userType") !== undefined &&
      localStorage.getItem("userType") === "learner"
    ) {
      window.location = "/my-mentors";
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

  useEffect(() => {
    console.log(studentsData);
  }, [studentsData]);

  return (
    <>
      {pageDetails.pageName != "home" ? (
        <MentorSubjectDetails setPageDetails={setPageDetails} subDetails={pageDetails.details} />
      ) : (
        <div className='mentor-home'>
          <Navbar />
          <div className='mentor-curvature'></div>
          <div className='container-fluid'>
            <div className='mentor-curvature'></div>
            <div className='row px-3'>
              <div className='d-none d-xl-flex col-md-3 mb-3'>
                {/* TODO: remove hardcoded color */}
                <div className='card mt-3 p-5' style={style}>
                  <div className='lola-panel'>
                    <div className='speech-bubble'>
                      <div className={"mentor-bubble"}>
                        <div>
                          Hello there! I'm Lola! You will find your list of assigned students here for every subject you have opted to
                          teach. Click on the subject card to view the syllabus and the students’s progress.
                        </div>
                        <div className='mentor-button-space'>
                          <button
                            className='init-signin-button'
                            onClick={() => {
                              window.location = "/mentor-guidelines";
                            }}
                          >
                            NEED HELP?
                          </button>
                        </div>
                      </div>
                      {/* <p style={{ fontSize: "20px" }}>
                    You will find your list of assigned students here for every
                    subject you have opted to teach.
                  </p>
                  <p style={{ fontSize: "20px" }}>
                    Click on the subject card to view the syllabus and the
                    students’s progress.
                  </p> */}
                    </div>
                    <div className='lola'>
                      {
                        <p className='lola'>
                          <img src={lola} style={{ opacity: "0" }} alt='' />
                        </p>
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* TODO: Update these values dynamically */}
              {/* studentsData = {
              HIN10 : [{
                ...details
              }]
            } */}
              <div className='col'>
                {Object.keys(studentsData).map((classCode) => (
                  <div className='row p-3'>
                    <SubjectTitle style={style} classCode={classCode} details={details} setPageDetails={setPageDetails} />

                    {studentsData[classCode].map((details) => (
                      <div className='col-6 col-md-3' id='mentor-home-learners'>
                        <Card
                          details={{
                            ...details,
                            hasConsented: true,
                            userType: "mentor",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorHome;

// @ts-check

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/mentor-navbar";
import Card from "../LearnerHomePage/card";
import SubjectTitle from "./subject-title";
import { verify } from "../../verifyUser";

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
  }, []);

  return (
    <div className='mentor-home'>
      <Navbar />
      <div className='container-fluid'>
        <div className='row px-3'>
          <div className='d-none d-xl-flex col-md-3 mb-3'>
            {/* TODO: remove hardcoded color */}
            <div className='card mt-3 p-5' style={style}>
              <p style={{ fontSize: "34px" }}>
                You will find your list of assigned students here for every subject you have opted to teach.
              </p>
              <p style={{ fontSize: "34px" }}>Click on the subject card to view the syllabus and the students’s progress.</p>
            </div>
          </div>

          {/* TODO: Update these values dynamically */}
          <div className='col'>
            <div className='row p-3'>
              <SubjectTitle style={style} subject={"Mathematics"} />
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
            </div>

            <div className='row p-3'>
              <SubjectTitle style={style} subject={"Science"} />
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
              <div className='col-6 col-md-3'>
                <Card details={details} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorHome;

// @ts-check

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mentor-dashboard.css";
import MentorDashboardEditAttributes from "./mentor-edit-attributes";
import MentorDashboardChangeDetails from "./mentor-dashboard-change-details";
import Navbar from "../Navbar/mentor-navbar";
import { verify } from "../../verifyUser";

// main component
const MentorDashBoard = () => {
  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");

  const [mentorData, setMentorData] = useState({});
  // reroute if a different user is in session
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

  // obtaining user's details from the database
  const getData = async () => {
    if (!phone) return;
    if (curuser === "No user is logged in") return;
    axios
      .get(`/api/mentor/get-data/phone/${phone}`, {
        headers: { Authorization: `Bearer ${curuser}` },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data.phone != null || data.phone != undefined) {
          setMentorData(data);
        }
      });
  };

  useEffect(() => {
    verify(setCuruser, setPhone);
    getData();
  }, [phone, curuser]);

  return (
    <div className="mb-3">
      <Navbar />
      <div className="mentor-curvature"></div>
      <div className="container">
        <div className="row align-items-start">
          <div className="col-xl-3 col-12">
            <MentorDashboardChangeDetails
              details={{ ...mentorData, curuser }}
            />
          </div>
          <div className="col-xl-9 col-12">
            <MentorDashboardEditAttributes
              details={{ ...mentorData, curuser }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashBoard;

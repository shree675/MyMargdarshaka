// @ts-check

import React, { useState, useEffect } from "react";
import MentorDashboardEditAttributes from "./mentor-edit-attributes";
import MentorDashboardChangeDetails from "./mentor-dashboard-change-details";
import Navbar from "../Navbar/mentor-navbar";
import { verify } from "../../verifyUser";

const MentorDashBoard = () => {
  const [curuser, setCuruser] = useState("No user is logged in");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    verify(setCuruser, setPhone);
  }, []);

  return (
    <div className="mb-3">
      <Navbar />
      <div className="container">
        <div className="row align-items-start">
          <div className="col-xl-3 col-12">
            <MentorDashboardChangeDetails />
          </div>
          <div className="col-xl-9 col-12">
            <MentorDashboardEditAttributes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashBoard;

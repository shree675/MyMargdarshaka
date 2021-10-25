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

  const details = {
    phone: "+919876543210",
    name: "Kamini S",
    email: "kamini@gmail.com",
    language: "English",
    time: "Morning",
    approved: true,
    Classes: [
      {
        code: "HIN6",
        chapters: [
          {
            name: "Chapter 1",
            subtopics: [
              ["Subtopic 1.1", "false"],
              ["Subtopic 1.2", "false"],
              ["Subtopic 1.3", "false"],
              ["Subtopic 1.4", "false"],
            ],
          },
        ],
        students: [],
      },
      {
        code: "HIN7",
        chapters: [
          {
            name: "Chapter 1",
            subtopics: [
              ["Subtopic 1.1", "false"],
              ["Subtopic 1.2", "false"],
              ["Subtopic 1.3", "false"],
              ["Subtopic 1.4", "false"],
            ],
          },
        ],
        students: [],
      },
      {
        code: "HIN8",
        chapters: [
          {
            name: "Chapter 1",
            subtopics: [
              ["Subtopic 1.1", "false"],
              ["Subtopic 1.2", "false"],
              ["Subtopic 1.3", "false"],
              ["Subtopic 1.4", "false"],
            ],
          },
        ],
        students: [],
      },
      {
        code: "HIN9",
        chapters: [
          {
            name: "Chapter 1",
            subtopics: [
              ["Subtopic 1.1", "false"],
              ["Subtopic 1.2", "false"],
              ["Subtopic 1.3", "false"],
              ["Subtopic 1.4", "false"],
            ],
          },
        ],
        students: [],
      },
      {
        code: "HIN10",
        chapters: [
          {
            name: "Chapter 1",
            subtopics: [
              ["Subtopic 1.1", "false"],
              ["Subtopic 1.2", "false"],
              ["Subtopic 1.3", "false"],
              ["Subtopic 1.4", "false"],
            ],
          },
        ],
        students: [],
      },
    ],
    profile_picture_url:
      "https://media.istockphoto.com/vectors/user-profile-icon-flat-red-round-button-vector-illustration-vector-id1162440985?k=20&m=1162440985&s=170667a&w=0&h=cQJ5HDdUKK_8nNDd_6RBoeDQfILERZnd_EirHTi7acI=",
  };

  return (
    <div className='mb-3'>
      <Navbar />
      <div className='container'>
        <div className='row align-items-start'>
          <div className='col-xl-3 col-12'>
            <MentorDashboardChangeDetails />
          </div>
          <div className='col-xl-9 col-12'>
            <MentorDashboardEditAttributes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashBoard;

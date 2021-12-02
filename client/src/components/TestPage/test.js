//@ts-check

import React from "react";
import LearnerNavbar from "../Navbar/learner-navbar";
import data from "../../data";
import "./test.css";

// custom css for button
const buttonStyle = {
  height: "30px",
  width: "100px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  cursor: "pointer",
};

// main page component
const Test = () => {
  // displaying the frontend of the page
  return (
    <div>
      <LearnerNavbar />
      <div className='test-main'>
        <div className='test-header'>Test</div>
        <div className='test-content'>
          {data.test.map(
            (
              item,
              i // displaying the questions
            ) => (
              <div>
                <div className='test-question'>{`Question ${i + 1} : ${item.q}`}</div>
                {item.op.map(
                  (
                    opt // displaying the options
                  ) => (
                    <div style={{ paddingLeft: "20px" }}>
                      <input type='checkbox' className='test-checkbox' />
                      <label style={{ marginLeft: "10px" }}>{opt}</label>
                    </div>
                  )
                )}
              </div>
            )
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{ ...buttonStyle, background: "red" }}
            onClick={() => {
              window.location = "/my-mentors";
            }}
          >
            CANCEL
          </div>
          <div
            style={{
              ...buttonStyle,
              background: "#5D1049",
              marginLeft: "20px",
            }}
            onClick={() => {
              // function to mimic test submission
              window.location = "/my-mentors";
              alert("Submitted successfully.");
            }}
          >
            SUBMIT
          </div>
        </div>
      </div>
      {alert(
        "Please note that this test functionality is representative which means that no real test is being conducted using this platform."
      )}
    </div>
  );
};

export default Test;

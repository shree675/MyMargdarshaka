import React from "react";

import LearnerNavbar from "../Navbar/learner-navbar";
import data from "../../data";
import "./test.css";

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

const Test = () => {
  return (
    <div className='test-main'>
      <div className='test-header'>Test</div>
      <div className='test-content'>
        {data.test.map((item, i) => (
          <div>
            <div className='test-question'>{`Question ${i + 1} : ${item.q}`}</div>
            {item.op.map((opt) => (
              <div style={{ paddingLeft: "20px" }}>
                <input type='checkbox' className='test-checkbox' />
                <label style={{ marginLeft: "10px" }}>{opt}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div style={{ ...buttonStyle, background: "red" }}>CANCEL</div>
        <div style={{ ...buttonStyle, background: "#5D1049", marginLeft: "20px" }}>SUBMIT</div>
      </div>
    </div>
  );
};

export default Test;

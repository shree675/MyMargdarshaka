import React from "react";

import LearnerNavbar from "../Navbar/learner-navbar";
import data from "../../data";

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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "#5D1049",
          fontSize: "35px",
          margin: "20px 0px 20px 0px",
          paddingLeft: "600px",
        }}
      >
        Test
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingLeft: "50px",
        }}
      >
        {data.test.map((item, i) => (
          <div>
            <div
              style={{
                background: "#5D1049",
                color: "white",
                height: "70px",
                width: "90%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingLeft: "20px",
                margin: "10px 0px 10px 0px",
              }}
            >
              {`Question ${i + 1} : ${item.q}`}
            </div>
            {item.op.map((opt) => (
              <div style={{ paddingLeft: "20px" }}>
                <input type="checkbox" />
                <label style={{ marginLeft: "10px" }}>{opt}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ ...buttonStyle, background: "red" }}>CANCEl</div>
        <div
          style={{ ...buttonStyle, background: "#5D1049", marginLeft: "20px" }}
        >
          SUBMIT
        </div>
      </div>
    </div>
  );
};

export default Test;

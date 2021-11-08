// @ts-check

import React from "react";
// @ts-ignore
import mentor from "../../assets/virtual_mentor_antennae.gif";
import ChatBubble from "react-chat-bubble";
import "./common-guidelines.css";

const LearnerGuidelines = () => {
  return (
    <div>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className={"bubble"}>Hello there!</div>
            {/* <ChatBubble
              className={"bubble"}
              messages={[
                {
                  image: "../../assets/lock.svg",
                  text: "Hello! Good Morning!",
                },
              ]}
            /> */}
          </div>
          <div className="row">
            <img
              src={mentor}
              style={{ width: "596px", height: "842px" }}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerGuidelines;

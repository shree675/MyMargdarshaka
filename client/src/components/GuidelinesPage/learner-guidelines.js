// @ts-check

import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
// @ts-ignore
import mentor from "../../assets/virtual_mentor_antennae.gif";
import "./common-guidelines.css";
import "react-chatbot-kit/build/main.css";

const LearnerGuidelines = () => {
  return (
    <div className="body">
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
              className="col"
              src={mentor}
              style={{ width: "596px", height: "842px" }}
              alt=""
            />
            <div
              className="col"
              style={{ width: "300px", backgroundColor: "white" }}
            >
              <Chatbot
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerGuidelines;

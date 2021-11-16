// @ts-check

import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
// @ts-ignore
import mentor from "../../assets/lola_basic_motion.gif";
import "react-chatbot-kit/build/main.css";
import "./common-guidelines.css";

const LearnerGuidelines = () => {
  return (
    <div className="body">
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="bubble">Hello there!</div>
          </div>
          <div className="row">
            <img
              className="col lola-gif"
              // style={{ width: "100px" }}
              src={mentor}
              alt=""
            />
            <div className="col">
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

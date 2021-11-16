// @ts-check
import React from "react";
// @ts-ignore
import lola from "../../assets/lola_with_sparkle_trail.gif";
import Chatbot from "react-chatbot-kit";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProviderCommon";

import "react-chatbot-kit/build/main.css";
import "./guidelines.css";

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
              src={lola}
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





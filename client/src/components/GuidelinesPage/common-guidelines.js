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

// main page component
const CommonGuidelines = () => {
  // displaying the frontend of the page
  return (
    <div className='body' style={{ marginTop: "0px", borderRadius: "0px" }}>
      <div className='container'>
        <div className='col'>
          <div className='row'>
            <div className='bubble'>Hello there Stranger! How can I help you?</div>
          </div>
          <div className='col'>
            <div className='optional-signin'>
              <button
                className='init-signin-button'
                onClick={() => {
                  // if the user wants to log in
                  window.location = "/init-signin";
                }}
              >
                SIGN IN
              </button>
            </div>
          </div>
          <div className='row'>
            <img className='col lola-gif' src={lola} alt='' />
            <div className='col'>
              {/* embedding the chatbot */}
              <Chatbot config={config("")} actionProvider={ActionProvider} messageParser={MessageParser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonGuidelines;

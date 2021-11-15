// @ts-check
import React from "react";
// @ts-ignore
import lola from "../../assets/lola_with_sparkle_trail.gif";
import "./common-guidelines.css";
import Chatbot from "react-chatbot-kit";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProviderCommon";
import "./common-guidelines.css";
import "react-chatbot-kit/build/main.css";

/* const CommonGuidelines = () => {
  return (
    <div className='body'>
      <div className='container'>
        <div className='col'>
          <div className='row'>
            <div className={"bubble"}>
              <div>Hello there! I'm Lola! How can I help you?</div>
                
                </div>
          </div>
          <div className= 'row'>
            <div className= 'lola-row'>
            <img className= 'col' src={lola}  alt='' />
            <div className="col" style={{ backgroundColor: "white" }}>
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
    </div>
  );
};

export default CommonGuidelines; */

const CommonGuidelines = () => {
  return (
    <div className="body">
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="bubble">Hello there! I'm Lola! How can I help you?</div>
          </div>
          <div className="row">
            <img
              className="col"
              src={lola}
              /* style={{ width: "596px", height: "842px" }} */
              alt=""
            />
            <div className="col" style={{ backgroundColor: "white" }}>
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

export default CommonGuidelines;


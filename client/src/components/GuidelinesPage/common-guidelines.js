// @ts-check
import React from "react";
// @ts-ignore
/* import lola from "../../assets/virtual_mentor_antennae.gif"; */
import lola from "../../assets/lola_with_sparkle_trail.gif";
import ChatBubble from "react-chat-bubble";
import "./common-guidelines.css";

const CommonGuidelines = () => {
  return (
    <div className='body'>
      <div className='container'>
        <div className='col'>
          <div className='row'>
            <div className={"bubble"}>
              <div>Hello there! I'm Lola! How can I help you?</div>
                
                </div>
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
          <div className= 'row'>
            <div className= 'lola-row'>
            <img src={lola} /* style={{ width: "596px", height: "842px" }} */ alt='' />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonGuidelines;

import React from "react";
import "./URLButton.css";

// a button that takes to the given url
const URLButton = (props) => {
  return (
 
    <div className="option-buttons">
      <button className = 'option-button' onClick = {()=> {window.location=props.url}}>
        {props.text}
      </button>
      <button className="option-button"
      onClick={props.actionProvider.endConversation}
        >
      Start over!
        </button>
    </div>
    
  );
};

export default URLButton;

/**
 * This module is used for chatbot responses that are essentailly just redirects. 
 * It provides an extra check layer to confirm the redirect, then opens the new
 * link in the same page
 */
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

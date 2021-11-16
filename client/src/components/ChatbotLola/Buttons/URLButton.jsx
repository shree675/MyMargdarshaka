import React from "react";
import "./URLButton.css";

// a button that takes to the given url
const URLButton = ({ text, url }) => {
  return (
 
    <button className = 'option-button' onClick = {()=> {window.location=url}}>
      {text}
    </button>
    
  );
};

export default URLButton;

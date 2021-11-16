import React from "react";
import "./Feedback.css";

// a button that takes to the given url
const Feedback = ({ url }) => {
  return (
    <a href={url} className='a'>
      Feedback
    </a>
  );
};

export default Feedback;

// @ts-check

import "./button.css";
import React from "react";

// common button implementation
const Button = ({ text, location, click }) => {
  return (
    <button className='custom-button' type='button' onClick={() => click()}>
      {text}
    </button>
  );
};

export default Button;

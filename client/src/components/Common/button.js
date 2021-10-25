// @ts-check
import "./button.css";
import React from "react";

const Button = ({ text, location }) => {
  return (
    <button
      className="custom-button"
      onClick={() => {
        window.location = { location };
      }}
    >
      {text}
    </button>
  );
};

export default Button;

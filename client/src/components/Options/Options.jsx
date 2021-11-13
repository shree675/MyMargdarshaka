import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Learn how to learn online",
      handler: props.actionProvider.handleLearnOnline,
      id: 1,
    },
    {
      text: "Submit feedback",
      handler: props.actionProvider.handleFeedback,
      id: 2,
    },
    {
      text: "FAQ",
      handler: props.actionProvider.handleFAQ,
      id: 3,
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;

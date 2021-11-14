import React from "react";

import "./LearnOnline.css";

const LearnOnline = (props) => {
  const options = [
    {
      text: props.nextActionText,
      handler: () =>
        props.actionProvider.handleLearnOnline(
          props.message,
          props.widgetName
        ),
      id: 1,
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default LearnOnline;

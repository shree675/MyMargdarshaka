import React from "react";

import "./ModuleOptions.css";

const Options = (props) => {
  const options = [
    {
      text: "Learn how to learn online",
      handler: () =>
        props.actionProvider.handleLearnOnline(
          "Learning online can be very challenging! There are so many distractions! So many resources! But there are ways to make the best of it! Do you want to know how?",
          "learnOnlineStep1"
        ),
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
    {
      text: "Getting Started with My Margdarshaka",
      handler: props.actionProvider.handleGettingStarted,
      id: 4,
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

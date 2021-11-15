import React from "react";

const MultipleOptions = (props) => {
  const options = [
    {
      text: props.nextActionText,
      handler: () =>
        props.actionProvider.handleLearnOnline(props.message, props.widgetName),
      id: 1,
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  if (props.otherOption != null) {
    buttonsMarkup.push(
      <button
        key={2}
        onClick={() =>
          props.actionProvider.handleLearnOnline(
            props.otherOption.message,
            props.otherOption.widgetName
          )
        }
        className="option-button"
      >
        {props.otherOption.nextActionText}
      </button>
    );
  }

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default MultipleOptions;

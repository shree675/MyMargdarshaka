import React from "react";

const MultipleOptions = (props) => {
  const options = [
    {
      text: props.nextActionText,
      handler: () =>
        props.actionProvider.handleSingleOption(props.message, props.widgetName),
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
          props.actionProvider.handleSingleOption(
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

  buttonsMarkup.push(
    <button
      key={3}
      onClick={props.actionProvider.endConversation}
      className="option-button"
    >
      Start over!
    </button>
  );

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default MultipleOptions;

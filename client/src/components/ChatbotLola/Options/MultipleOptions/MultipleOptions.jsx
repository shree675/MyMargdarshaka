import React from "react";

const handleGotoLink = (url) => {
  console.log(url)
  //window.location = url

}

const MultipleOptions = (props) => {
  let i =2
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
        key={i++}
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
  /* if(props.link != null && props.link !=undefined && props.link != "")
  {
    buttonsMarkup.push(
      <button
        key={i++}
        onClick={handleGotoLink(props.link)}
        className="option-button"
      >
        GO TO LINK!
      </button>
    );
  } */

  buttonsMarkup.push(
    <button
      key={i++}
      onClick={props.actionProvider.endConversation}
      className="option-button"
    >
      Start over!
    </button>
  );

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default MultipleOptions;

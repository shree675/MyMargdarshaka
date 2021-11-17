import React from "react";

import "./SingleOption.css";

let url = ""

const handleGotoLink = () => {
  //console.log(url)
  window.location = url
}

const SingleOption = (props) => {
  let i=2
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

  if(props.link != null && props.link !=undefined && props.link != "")
  {
    url = props.link
    buttonsMarkup.push(
      <button
        key={i++}
        onClick={handleGotoLink}
        className="option-button"
      >
        GO TO LINK!
      </button>
    );
  }

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

export default SingleOption;

import React from "react";

let url = ""

const handleGotoLink = () => {
  //console.log(url)
  //window.location = url
  //window.open(url)
  let a= document.createElement('a');
  a.target= '_blank';
  a.href= url;
  a.click();
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
  if(props.link != null && props.link !=undefined && props.link != "")
  {
    url = props.link
    buttonsMarkup.push(
      <button
        target = '_blank'
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

export default MultipleOptions;

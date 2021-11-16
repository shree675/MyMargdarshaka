import React from "react";

const FAQ = (props) => {
  const options = [];
  let i = 1

  for(let query of props.queries)
  {
    const option = {
      text: query.question,
      handler: () => props.actionProvider.handleSingleOption(query.answer, query.widget),
      id : i++
    }
    options.push(option)
  }

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));
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
  /* return (
    // a list with the questions and answers


    {<div className="faq">
      <h2>Frequently Asked Questions</h2>
      <ul>
        {queries.map((query, index) => {
          return (
            <li key={index}>
              <h3>{query.question}</h3>
              <p>{query.answer}</p>
            </li>
          );
        })}
      </ul>
    </div>}
  ); */
};

export default FAQ;

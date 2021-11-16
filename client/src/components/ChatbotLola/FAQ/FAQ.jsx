import React from "react";

const FAQ = ({ queries }) => {
  return (
    // a list with the questions and answers
    <div className="faq">
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
    </div>
  );
};

export default FAQ;

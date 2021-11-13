import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import FAQ from "../components/FAQ/FAQ";
import Feedback from "../components/FeedbackButton/Feedback";

import Options from "../components/Options/Options";
import Quiz from "../components/Quiz/Quiz";

const config = {
  botName: "Lola",
  initialMessages: [
    createChatBotMessage(`Hello there!`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },

    // This object is for each module
    {
      widgetName: "learnOnline",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "What is closure?",
            answer:
              "Closure is a way for a function to retain access to it's enclosing function scope after the execution of that function is finished.",
            id: 1,
          },
          {
            question: "Explain prototypal inheritance",
            answer:
              "Prototypal inheritance is a link between an object and an object store that holds shared properties. If a property is not found on the host object, javascript will check the prototype object.",
            id: 2,
          },
        ],
      },
    },
    // feedback widget
    {
      widgetName: "feedback",
      widgetFunc: (props) => <Feedback {...props} />,
      props: {
        url: "localhost:3000/feedback",
      },
    },
    // faq widget
    {
      widgetName: "faq",
      widgetFunc: (props) => <FAQ {...props} />,
      props: {
        queries: [
          {
            question: "Question 1",
            answer: "Answer 1",
          },
          {
            question: "Question 2",
            answer: "Answer 2",
          },
          {
            question: "Question 3",
            answer: "Answer 3",
          },
          {
            question: "Question 4",
            answer: "Answer 4",
          },
          {
            question: "Question 5",
            answer: "Answer 5",
          },
        ],
      },
    },
  ],
};

export default config;

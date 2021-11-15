import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import FAQ from "../components/FAQ/FAQ";
import Feedback from "../components/FeedbackButton/Feedback";

import Options from "../components/Options/ModuleOptions";
import LearnOnline from "../components/Options/LearnOnline/LearnOnline";
import MultipleOptions from "../components/Options/MultipleOptions/MultipleOptions";

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

    // **************************** LEANR ONLINE [START]  ****************************

    {
      widgetName: "learnOnlineStep1",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "YES!",
        message:
          "The most amazing thing about learning online, is FREEDOM!  It is because you explore things on your own and choose to learn what interests you.  This, in contrast to the traditional classroom, where you are forced to listen to the teacher whether you like it or not, makes it more enjoyable to learn.",
        widgetName: "learnOnlineStep2",
      },
    },

    {
      widgetName: "learnOnlineStep2",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "Let's go!",
        message:
          "Navigting around the web to find what is of your taste is a little cumbersome. The following tips might help you narrow down your search space:",
        widgetName: "learnOnlineStep3",
      },
    },

    {
      widgetName: "learnOnlineStep3",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "Okay, next!",
        message: `Use specific keywords relating to the topics when searching for something.
          For example, instead of searching for "optics", you can do "optics class 10"`,
        widgetName: "learnOnlineStep4",
      },
    },

    {
      widgetName: "learnOnlineStep4",
      widgetFunc: (props) => <MultipleOptions {...props} />,
      props: {
        nextActionText: "I prefer reading",
        message: `Different people have different learning styles. Some people prefer video or audio, whil some prefer reading? What works better for you?`,
        widgetName: "learnOnlineStep5",
        otherOption: {
          nextActionText: "I prefer videos or audio",
          widgetName: "coolResourcesStep1",
          message: `The internet is filled with the most wonderful resources to learn anything, quite literally! Do you want to know some of the best audio and video learning resources out there?!`,
        },
      },
    },

    {
      widgetName: "learnOnlineStep5",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "YES!",
        message: `If you're more of a reading person, find articles and websites that have interactive
        playgrounds.  Take understanding probability as an example. There might be games and
        websites that present the information in a very enjoyable way. Searching for
        "visualizing probability website" gives us this result https://seeingtheory.brown.edu/basic-probability/index.html and it is indeed a very fun
        website.`,
        widgetName: "learnOnlineStep6",
      },
    },

    {
      widgetName: "learnOnlineStep6",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "COOL!",
        message: `You can also find questions to practice on a particular topic that you just learnt.
        Let's say you have just finished reading up on optics. What you can do to test
        your understanding is search for practice questions on optics. The search result
        https://www.learncbse.in/mcq-questions-for-class-10-science-with-answers/
        contains nicely put questions relating to that topic.`,
        widgetName: "options",
      },
    },

    // **************************** LEANR ONLINE [END]  ****************************

    // **************************** COOL RESOURCES [START]  ****************************

    // {
    //   widgetName: "coolResources",
    //   widgetFunc: (props) => <LearnOnline {...props} />,
    //   props: {
    //     nextActionText: "Okay, next!",
    //     message: `The internet is filled with the most wonderful resources to learn anything, quite literally! Do you want to know some of the best audio and video learning resources out there?!`,
    //     widgetName: "coolResourcesStep1",
    //   },
    // },

    {
      widgetName: "coolResourcesStep1",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "Okay, next!",
        message: `Do you want to learn the best science,
        technology, math, art and medicine?`,
        widgetName: "coolResourcesStep2",
      },
    },

    {
      widgetName: "coolResourcesStep2",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "YES!",
        message: `Khan Academy - https://www.khanacademy.org/
        1. Khan Academy might be your go-to place to learn all things science,
        technology, math, art and medicine.\n
        2. They have topics divided into smaller units and each unit contains a well
        formed test.\n
        3. Their philosophy of "Teaching for mastery" is extraordinarily effective!\n
        4. The community of learners in the comments are quite active and respond to
        the questions.`,
        widgetName: "coolResourcesStep3",
      },
    },

    {
      widgetName: "coolResourcesStep3",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "Okay, next!",
        message: `Do you want to learn a new language perhaps?`,
        widgetName: "coolResourcesStep4",
      },
    },

    {
      widgetName: "coolResourcesStep4",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "YES!",
        message: `Want to try out a new language? Just search for it! https://www.duolingo.com/
        is a very fun place to explore`,
        widgetName: "coolResourcesStep5",
      },
    },

    {
      widgetName: "coolResourcesStep5",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "Okay, next!",
        message: `Do you want to learn pretty much anything under the sun!?`,
        widgetName: "coolResourcesStep6",
      },
    },

    {
      widgetName: "coolResourcesStep6",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "YES!",
        message: `YouTube - https://www.youtube.com/\n
        1. A great wealth of knowledge where tons of educators share their explanations.\n
        2. You will find the explanation in the language you are comfortable with a very
        high chance.\n
        3. If you like a particular explanation, check if they have a playlist on that topic
        in the description or on their channel!\n`,
        widgetName: "coolResourcesStep7",
      },
    },

    {
      widgetName: "coolResourcesStep7",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "YES!",
        message: `And now! Are you ready for something more advance and structured? Maybe you’re ready for professional certification that can help with boosting your career?`,
        widgetName: "coolResourcesStep8",
      },
    },

    {
      widgetName: "coolResourcesStep8",
      widgetFunc: (props) => <LearnOnline {...props} />,
      props: {
        nextActionText: "COOL!",
        message: `(Advanced) NPTEL - https://nptel.ac.in/\n
        1. Looking to just delve right into the depths of a subject? NPTEL is the place to
        go!\n
        2. NPTEL contains organized content for a particular course. These are
        university level courses but if you're the adventurous and passionate kind, this
        is your home.\n`,
        widgetName: "options",
      },
    },

    // **************************** COOL RESOURCES [END]  ****************************

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

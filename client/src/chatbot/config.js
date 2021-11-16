import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import FAQ from "../components/ChatbotLola/FAQ/FAQ";
import URLButton from "../components/ChatbotLola/Buttons/URLButton";

import ModuleOptions from "../components/ChatbotLola/Options/ModuleOptions/ModuleOptions";
import SingleOption from "../components/ChatbotLola/Options/SingleOption/SingleOption";
import MultipleOptions from "../components/ChatbotLola/Options/MultipleOptions/MultipleOptions";

const config = (props)=> 
{
  console.log(props)
  
  return {  
  botName: "Lola",
  name: props,
  initialMessages: [
    createChatBotMessage(`Hello there `+ props +`! How can I help you?`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <ModuleOptions {...props} />,
    },

    // **************************** LEANR ONLINE [START]  ****************************

    {
      widgetName: "learnOnlineStep1",
      widgetFunc: (props) => <SingleOption {...props} />,
      props: {
        nextActionText: "YES!",
        message:
          "The most amazing thing about learning online, is FREEDOM!  It is because you explore things on your own and choose to learn what interests you.  This, in contrast to the traditional classroom, where you are forced to listen to the teacher whether you like it or not, makes it more enjoyable to learn.",
        widgetName: "learnOnlineStep2",
      },
    },

    {
      widgetName: "learnOnlineStep2",
      widgetFunc: (props) => <SingleOption {...props} />,
      props: {
        nextActionText: "Okay, next!",
        message:
          "Navigting around the web to find what is of your taste is a little cumbersome. The following tips might help you narrow down your search space:",
        widgetName: "learnOnlineStep3",
      },
    },

    {
      widgetName: "learnOnlineStep3",
      widgetFunc: (props) => <SingleOption {...props} />,
      props: {
        nextActionText: "Okay, next!",
        message: `Use specific keywords relating to the topics when searching for something.
          For example, instead of searching for "optics", you can do "optics class 10"`,
        widgetName: "learnOnlineStep4",
      },
    },

    {
      widgetName: "learnOnlineStep4",
      widgetFunc: (props) => <SingleOption {...props} />,
      props: {
        nextActionText: "Okay, next!",
        message: `Different people have different learning styles. Some people prefer video or audio, whil some prefer reading? What works better for you?`,
        widgetName: "learnOnlineStep5",
      },
    },

    {
      widgetName: "learnOnlineStep5",
      widgetFunc: (props) => <MultipleOptions {...props} />,
      props: {
        nextActionText: "I prefer reading",
        message: `If you're more of a reading person, find articles and websites that have interactive
        playgrounds.  Take understanding probability as an example. There might be games and
        websites that present the information in a very enjoyable way. Searching for
        "visualizing probability website" gives us this result https://seeing-theory.brown.edu/basic-probability/index.html and it is indeed a very fun
        website.`,
        link: "https://seeing-theory.brown.edu/basic-probability/index.html",
        widgetName: "learnOnlineStep6",
        otherOption: {
          nextActionText: "I prefer videos or audio",
          widgetName: "coolResourcesStep1",
          message: `The internet is filled with the most wonderful resources to learn anything, quite literally! Do you want to know some of the best audio and video learning resources out there?!`,
        },
      },
    },
    {
      widgetName: "learnOnlineStep6",
      widgetFunc: (props) => <SingleOption {...props} />,
      props: {
        nextActionText: "Next!",
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
      widgetFunc: (props) => <MultipleOptions {...props} />,
      props: {
        nextActionText: "YES!",
        message: `Do you want to learn the best science,
        technology, math, art and medicine?`,
        widgetName: "coolResourcesStep2",
      },
    },

    {
      widgetName: "coolResourcesStep2",
      widgetFunc: (props) => <MultipleOptions {...props} />,
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
        otherOption: {
          nextActionText: "No",
          widgetName: "coolResourcesStep4",
          message: `Do you want to learn a new language perhaps?`,
        },
      },
    },

    {
      widgetName: "coolResourcesStep3",
      widgetFunc: (props) => <SingleOption {...props} />,
      props: {
        nextActionText: "Okay, next!",
        message: `Do you want to learn a new language perhaps?`,
        widgetName: "coolResourcesStep4",
      },
    },

    {
      widgetName: "coolResourcesStep4",
      widgetFunc: (props) => <MultipleOptions {...props} />,
      props: {
        nextActionText: "YES!",
        message: `Just search for it! https://www.duolingo.com/
        is a very fun place to explore`,
        widgetName: "coolResourcesStep5",
        otherOption: {
          nextActionText: "No",
          widgetName: "coolResourcesStep6",
          message: `Do you want to learn pretty much anything under the sun?!`,
        },
      },
    },

    {
      widgetName: "coolResourcesStep5",
      widgetFunc: (props) => <SingleOption {...props} />,
      props: {
        nextActionText: "Okay, next!",
        message: `Do you want to learn pretty much anything under the sun?!`,
        widgetName: "coolResourcesStep6",
      },
    },

    {
      widgetName: "coolResourcesStep6",
      widgetFunc: (props) => <SingleOption {...props} />,
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
      widgetFunc: (props) => <SingleOption {...props} />,
      props: {
        nextActionText: "NICE!",
        message: `And now! Are you ready for something more advance and structured? Maybe you’re ready for professional certification that can help with boosting your career?`,
        widgetName: "coolResourcesStep8",
      },
    },

    {
      widgetName: "coolResourcesStep8",
      widgetFunc: (props) => <SingleOption {...props} />,
      props: {
        nextActionText: "Next!",
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

    // feedback widget - 
    //TODO: should show only for signed in people
    {
      widgetName: "feedback",
      widgetFunc: (props) => <URLButton {...props} />,
      props: {
        text: "Feedback",
        url: "/feedback",
      },
    },
    // **************************** FAQ WIDGETS [START]  ****************************
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
    // learner faq widget
    {
      widgetName: "learnerfaq",
      widgetFunc: (props) => <FAQ {...props} />,
      props: {
        queries: [
          {
            question: "Who are my Mentors?",
            answer: "All your mentors are listed on your homepage called ‘MY MENTORS’. Shall we go take a look?",
            widget: "myMentorsRedirect"
          },
          {
            question: "How do I reach my mentor?",
            answer: "You can reach out to your mentor using the chat functionality available by clicking on the chat icon under your mentors tile on the MY MENTORS page. Ask them to share their contact number with you. Let’s go reach out to them? ",
            widget: "myMentorsRedirect"
          },
          {
            question: "What is this NIOS exam and how does it work?",
            answer: "NIOS is the National Institute of Open Schooling, provided by the Government of India. This means that you can obtain informal eduction from ANYWHERE that you want, such as from the Mentors on My Margdarshaka. Then, you can register to take the certification exams for the required subjects, and earn a Secondary School (Class 10) or Senior Secondary School (Class 12) Certificate. You need to register on their website for the exams. Shall we go to their website and read more about how it works exactly?",
            widget: "NIOSRedirect"
          },
          {
            question: "I have a doubt.",
            answer: "You could ask your mentor any doubt using the chat feature available by clicking on the chat icon on your mentors card. ",
            widget: "myMentorsRedirect"
          },
          {
            question: "How do I update my preferences?",
            answer: "You can update details such as your preferred time and preferred language of instruction in the dashboard page. Let me show you where it is?",
            widget: "learnerDashboardRedirect"
          },
        ],
      },
    },
    //common faq
    {
      widgetName: "commonfaq",
      widgetFunc: (props) => <FAQ {...props} />,
      props: {
        queries: [
          {
            question: "How to use My Margdarshaka?",
            answer: "Here is an illustrative tutorial on how to use My Margdarshaka. Let's go check it out?",
            widget: "gettingStarted"
          },
          {
            question: "How do I reach my mentor?",
            answer: "You can reach out to your mentor using the chat functionality available by clicking on the chat icon under your mentors tile on the MY MENTORS page. Ask them to share their contact number with you. Let’s go sign up and get started? ",
            widget: "signUpRedirect"
          },
          {
            question: "What is this NIOS exam and how does it work?",
            answer: "NIOS is the National Institute of Open Schooling, provided by the Government of India. This means that you can obtain informal eduction from ANYWHERE that you want, such as from the Mentors on My Margdarshaka. Then, you can register to take the certification exams for the required subjects, and earn a Secondary School (Class 10) or Senior Secondary School (Class 12) Certificate. You need to register on their website for the exams. Shall we go to their website and read more about how it works exactly?",
            widget: "NIOSRedirect"
          },
          {
            question: "I have a doubt.",
            answer: "You could ask your mentor any doubt using the chat feature available by clicking on the chat icon on your mentors card. Let's go sign up and get started?",
            widget: "signUpRedirect"
          },
        ],
      },
    },
    // mentor faq widget
    {
      widgetName: "mentorfaq",
      widgetFunc: (props) => <FAQ {...props} />,
      props: {
        queries: [
          {
            question: "Where do I find my students?",
            answer: "All your students are listed according to the subjects or classes that you teach, in your homepage named as ‘MY STUDENTS’. Shall w ehead over there and go meet them?",
            widget: "myStudentsRedirect"
          },
          {
            question: "How do I contact my students?",
            answer: "You can reach out to your students using the chat functionality available by clicking on the chat icon under the corresponding tile on the MY STUDENTS page. Ask them to share their contact number with you for better communication. Let’s go reach out to them? ",
            widget: "myStudentsRedirect"
          },
          {
            question: "What is this NIOS exam and how does it work?",
            answer: "NIOS is the National Institute of Open Schooling, provided by the Government of India. This means that you can teach your students informally. Then, you can guide them towards registering and taking the certification exams for the required subjects, and earning a Secondary School (Class 10) or Senior Secondary School (Class 12) Certificate. You can check out the NIOS website for details of registration and help your students. We highly recommend that you encourage your students to take the exams. Lets head over to the NIOS website and check it out?",
            widget: "NIOSRedirect"
          },
          {
            question: "How do I update my preferences?",
            answer: "You can update details such as your preferred time and preferred language of instruction in the dashboard page. Let me show you where it is?",
            widget: "mentorDashboardRedirect"
          },
        ],
      },
    },
    {
      widgetName: "myMentorsRedirect",
      widgetFunc: (props) => <URLButton {...props} />,
      props: {
        text: "YES, LETS GO!",
        url: "/my-mentors",
      },
    },
    {
      widgetName: "NIOSRedirect",
      widgetFunc: (props) => <URLButton {...props} />,
      props: {
        text: "SURE, LETS GO!",
        url: "https://nios.ac.in/admission.aspx",
      },
    },
    {
      widgetName: "signUpRedirect",
      widgetFunc: (props) => <URLButton {...props} />,
      props: {
        text: "YES, LESSGO!",
        url: "/init-signin",
      },
    },
    {
      widgetName: "learnerDashboardRedirect",
      widgetFunc: (props) => <URLButton {...props} />,
      props: {
        text: "YES!",
        url: "/learner-dashboard",
      },
    },
    {
      widgetName: "myStudentsRedirect",
      widgetFunc: (props) => <URLButton {...props} />,
      props: {
        text: "YES, LETS GO!",
        url: "/my-students",
      },
    },
    {
      widgetName: "mentorDashboardRedirect",
      widgetFunc: (props) => <URLButton {...props} />,
      props: {
        text: "YES!",
        url: "/mentor-dashboard",
      },
    },
    // **************************** FAQ WIDGETS [START]  ****************************
    // getting started widget
    {
      widgetName: "gettingStarted",
      widgetFunc: (props) => <URLButton {...props} />,
      props: {
        text: "Getting Started with My Margdarshaka",
        url: "/getting-started",
      },
    },
  ],
};
}
export default config;

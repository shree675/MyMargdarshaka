const data = {
  classes: [6, 7, 8, 9, 10, 11, 12],
  primSubs: ["Hindi", "Telugu", "Maths", "Science", "Social"],//English
  secSubs: ["Physics", "Chemistry", "Biology"],
  langs: ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"],
  times: ["Morning", "Afternoon", "Evening"],
  codes: {
    Hindi: "HIN",
    Telugu: "TEL",
    Maths: "MAT",
    Science: "SCI",
    Social: "SOC",
    Physics: "PHY",
    Chemistry: "CHEM",
    Biology: "BIO"
  },


  //some example data pf subtopics for one or 2 class codes
  PHY10: ['kinematics', 'kinetics', 'optics', 'electrodynamics'],
  ENG9: ['Punctuation', 'grammar', 'Reading', 'Writing'],
  default: {
    chapters: [
      {name: 'Chapter 1',
        subtopics: [['Subtopic 1.1',false], ['Subtopic 1.2',false], ['Subtopic 1.3',false], ['Subtopic 1.4',false]]},
    ]
  },

  chapters: {
    Science: [
      {
        name: "kinetics",
        subtopics: [
          "subtopic11",
          "subtopic12",
          "subtopic13",
          "subtopic14",
          "subtopic15",
          "subtopic16",
        ],
        pendingTests: ["subtopic11", "subtopic12"],
        completedTests: ["subtopic13", "subtopic14"],
      },
      {
        name: "optics",
        subtopics: [
          "subtopic21",
          "subtopic22",
          "subtopic23",
          "subtopic24",
          "subtopic25",
          "subtopic26",
        ],
        pendingTests: ["subtopic21", "subtopic22"],
        completedTests: ["subtopic23", "subtopic24"],
      },
      {
        name: "electordynamics",
        subtopics: [
          "subtopic31",
          "subtopic32",
          "subtopic33",
          "subtopic34",
          "subtopic35",
          "subtopic36",
        ],
        pendingTests: ["subtopic31", "subtopic32"],
        completedTests: ["subtopic33", "subtopic34"],
      },
      {
        name: "kinematics",
        subtopics: [
          "subtopic41",
          "subtopic42",
          "subtopic43",
          "subtopic44",
          "subtopic45",
          "subtopic46",
        ],
        pendingTests: ["subtopic41", "subtopic42"],
        completedTests: ["subtopic43", "subtopic44"],
      },
    ],
  },
  test: [
    {
      q: "Who is the PM?",
      op: ["option1", "option2", "option3", "option4"],
      ans: 2,
    },

    {
      q: "Who is the pres?",
      op: ["option1", "option2", "option3", "option4"],
      ans: 2,
    },
  ],
};

export default data;

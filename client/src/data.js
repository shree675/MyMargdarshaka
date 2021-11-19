const data = {
  classes: [6, 7, 8, 9, 10, 11, 12],
  primSubs: ["Hindi", "Telugu", "Maths", "Science", "Social", "English"], //English
  secSubs: ["Physics", "Chemistry", "Biology", "Maths"],
  langs: ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"],
  times: ["Morning", "Afternoon", "Evening"],
  codes: {
    Hindi: "HIN",
    Telugu: "TEL",
    Maths: "MAT",
    Mathematics: "MAT",
    Science: "SCI",
    Social: "SOC",
    Physics: "PHY",
    Chemistry: "CHEM",
    Biology: "BIO",
    English: "ENG",
  },
  codeToSubName: {
    HIN: "Hindi",
    TEL: "Telugu",
    ENG: "English",
    MAT: "Maths",
    SCI: "Science",
    SOC: "Social",
    PHY: "Physics",
    CHEM: "Chemistry",
    BIO: "Biology",
  },

  //some example data pf subtopics for one or 2 class codes
  ENG9: ["Punctuation", "grammar", "Reading", "Writing"],
  SCI10: [
    {
      name: "Metals and Non-metals",
      subtopics: [
        ["Physical properties", true],
        ["Chemical properties of metals", true],
        ["How do metals and non-metals react?", true],
        ["Occurrence of Metals", false],
        ["Corrosion", false],
      ],
      completedTests: ["Physical properties", "Chemical properties of metals"],
      pendingTests: [
        "How do metals and non-metals react?",
        "Occurrence of Metals",
        "Corrosion",
      ],
    },
    {
      name: "Carbon and its compounds",
      subtopics: [
        ["Bonding in carbon", true],
        ["Versatile nature of carbon", true],
        ["Chemical properties of carbon compounds", false],
        ["Important Carbon compunds", false],
        ["Sopas and detergents", false],
      ],
      completedTests: ["Bonding in carbon", "Versatile nature of carbon"],
      pendingTests: [
        "Chemical properties of carbon compounds",
        "Important Carbon compunds",
        "Sopas and detergents",
      ],
    },
    {
      name: "Life Processes",
      subtopics: [
        ["What are life processes?", true],
        ["Nutrition", false],
        ["Respiration", false],
        ["Transportation", false],
        ["Excretion", false],
      ],
      completedTests: ["What are life processes?", "Nutrition", "Respiration"],
      pendingTests: ["Transportation", "Excretion"],
    },
    {
      name: "Electricity",
      subtopics: [
        ["Electric current and circuit", false],
        ["Electric potential and potential difference", false],
        ["Circuit Diagram", false],
        ["OHM's Law", false],
        ["Factors on which the resistance of a conductor depends", false],
        ["Resistance of a system of resistors", false],
        ["Heating effect of Electric current", false],
        ["Electric power", false],
        ["Electric power-2", false],
      ],
      pendingTests: [
        "Electric current and circuit",
        "Electric potential and potential difference",
      ],
      completedTests: ["Circuit Diagram", "OHM's Law"],
    },
  ],

  default: {
    chapters: [
      {
        name: "Chapter 1",
        subtopics: [
          ["Subtopic 1.1", false],
          ["Subtopic 1.2", false],
          ["Subtopic 1.3", false],
          ["Subtopic 1.4", false],
        ],
      },
    ],
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
  getSubjectName: (code) => {
    let classNumber = Number(code[code.length - 1]);
    if (classNumber <= 2) {
      code = code.substr(0, code.length - 2);
    } else {
      code = code.substr(0, code.length - 1);
    }
    const subName = data.codeToSubName[code];
    return subName;
  },
  getClassNumber: (code) => {
    let classNumber = Number(code[code.length - 1]);
    if (classNumber <= 2) {
      return Number(code.substring(code.length - 2, code.length));
    } else {
      return classNumber;
    }
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

var Mentor = require("../models/mentor.model");
//input - either criteria or entire learner object
//subjects

const match = async (language, time, codes) => {
  let mentors = [];
  for (let code of codes) {
    console.log(language, time, codes); //also approved mentor should be in the criteria
    const matched_mentors = await Mentor.find({
      language: language,
      time: { $in: [...time] },
      code: code,
    });
    console.log(matched_mentors);
    mentors = [...mentors, ...matched_mentors];
  }
  return mentors;
};
module.exports = match;

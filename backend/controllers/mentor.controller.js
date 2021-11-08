const axios = require("axios");
const Mentor = require("../models/mentor.model");
const Learner = require("../models/learner.model");

module.exports.find_matches = async (req, res) => {
  // logic for matching students with the new mentor for
  // subjects for which they dont have mentor
  const mentor_id = req.params.id;
  let mentor;
  try {
    mentor = await Mentor.findById(mentor_id);
  } catch (e) {
    console.log(e);
    return;
  }
  const class_codes = mentor.Classes.map((cls) => cls.code);

  const all_learners = await Learner.find({});

  for (let cur_learner of all_learners) {
    if (
      cur_learner.language === mentor.language &&
      cur_learner.times.includes(mentor.time)
    ) {
      // now search for subjects
      // for which a mentor is not asigned

      for (const sub of cur_learner.subjects) {
        if (sub.mentor_id === "-1" && class_codes.includes(sub.code)) {
          let i = class_codes.indexOf(sub.code);
          mentor.Classes[i].students.push({ id: cur_learner._id });

          try {
            await mentor.save();
          } catch (e) {
            console.log(e);
          }

          i = cur_learner.subjects.indexOf(sub);
          cur_learner.subjects[i].mentor_id = mentor_id;

          try {
            await cur_learner.save();
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  }
  res.json("updated");
};

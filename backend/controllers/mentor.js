//@ts-check

const Mentor = require("../models/mentor.model");
const Learner = require("../models/learner.model");
const { mentorSchema } = require("../utils/joiSchemas");

// route to create a new mentor
module.exports.createMentor = (req, res) => {
  const { phone, name, email, language, time, approved, Classes, profile_picture_url } = req.body;

  console.log({
    phone,
    name,
    email,
    language,
    time,
    approved,
    Classes,
    profile_picture_url,
  });

  const mentor = new Mentor({
    phone,
    name,
    email,
    language,
    time,
    approved,
    Classes,
    profile_picture_url,
  });

  mentorSchema.validate(mentor);
  mentor
    .save()
    .then(() => res.json("Added new mentor!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

// route to get all mentors
async function getMentors(language, times, code) {
  let mentors = [];
  var matched_list = await Mentor.find({
    language: language,
    time: { $in: [...times] },
    "Classes.code": code,
    approved: true,
  });
  return matched_list;
}

// route to find matching mentors in the matching algorithm
module.exports.findMatches = async (req, res) => {
  const language = req.body.language;
  const times = req.body.times;
  let codes = [];
  const subjects = req.body.subjects;
  subjects.forEach((subject) => {
    codes.push(subject.code);
  });
  const type = req.body.type;

  let mentors = [];
  for (let code of codes) {
    try {
      var response = await getMentors(language, times, code);
      if (type === "reassign") {
        const mentor_ids = response.map((res) => res._id);
        res.json(mentor_ids);
        return;
      }
      console.log("all mentors : ", response);
      //choose 1 among many responses and append to mentors
      var theChosenMentor = -1; //in case of multiple compatible mentors, assign the student to the mentor who has minimum students
      let min = 1000; //maximum number of students is assumed to be 1000 (realistic assumption)
      for (let x of response) {
        let all_Classes = x.Classes;
        for (let Class of all_Classes) {
          //console.log(Class)
          if (Class.code == code) {
            //console.log(code, Class.students.length)
            if (Class.students.length <= min) theChosenMentor = x._id.toString();
          }
        }
      }
      // mentors ordered accordong to class codes order
      mentors.push(theChosenMentor);
    } catch (err) {
      console.log(err);
    }
  }
  res.json(mentors);
};

// route to update a mentor
module.exports.updateMentorByPhone = async (req, res) => {
  let phone = req.params.phone;
  let data = req.body;
  console.log(phone, data);
  await Mentor.findOneAndUpdate({ phone }, { $set: data });
  res.json("ok");
};

// route to update a mentor
module.exports.updateMentorById = async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  console.log("mentor id : ", id, "data : ", data);
  await Mentor.findByIdAndUpdate(id, { $set: data });
  res.json("ok");
};

// route to remove a learner from the mentor's list
module.exports.removeLearnerById = async (req, res) => {
  let mentor_id = req.params.id;
  let class_code = req.body.class_code;
  let learner_id = req.body.learner_id;

  console.log("data recieved in remove route : ", mentor_id, class_code, learner_id);

  let mentor = await Mentor.findById(mentor_id);

  let classes = mentor.Classes;

  for (let i = 0; i < classes.length; i++) {
    if (classes[i].code === class_code) {
      const stu_tmp = mentor.Classes[i].students.filter((stu) => stu.id != learner_id);
      mentor.Classes[i].students = stu_tmp;
      break;
    }
  }

  mentor
    .save()
    .then(() => res.json("Mentor status updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

// route to get all mentors
module.exports.getMentorById = async (req, res) => {
  let id = req.params.id;
  let data = await Mentor.findById(id).exec();
  res.json(data);
};

// route to get all mentors
module.exports.getMentorByPhone = async (req, res) => {
  let phone = req.params.phone;
  let data = await Mentor.findOne({ phone }).exec();
  res.json(data);
};

// route to get status of mentor
module.exports.getMentorStatus = async (req, res) => {
  let status = req.params.status;

  if (status === "open") {
    const data = await Mentor.find({ approved: false, rejected: false });
    res.json(data);
  } else if (status === "approved") {
    const data = await Mentor.find({ approved: true, rejected: false });
    res.json(data);
  } else if (status === "rejected") {
    const data = await Mentor.find({ approved: false, rejected: true });
    res.json(data);
  } else {
    res.status(404).json("Status is not correct.");
  }
};

// mentor matching algorithm
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
    if (cur_learner.language === mentor.language && cur_learner.times.includes(mentor.time)) {
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

// route to search a particular mentor
module.exports.search = async (req, res) => {
  let parameter = req.params.id;
  const results = await Mentor.find({
    phone: { $regex: parameter, $options: "i" },
  });
  const results2 = await Mentor.find({
    name: { $regex: parameter, $options: "i" },
  });
  res.send(results.concat(results2));
};

//@ts-check
const express = require("express");
const router = express.Router();
var Mentor = require("../models/mentor.model");
var { mentorSchema } = require("../utils/joiSchemas");
const { ObjectId } = require("mongodb");

router.route("/login/submitmentor").get((req, res) => {
  Mentor.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("notfound"));
});

router.route("/signup/creatementor").post((req, res) => {
  const phone = req.body.phone;
  const name = req.body.name;
  const email = req.body.email;
  const language = req.body.language;
  const time = req.body.time;
  const approved = req.body.approved;
  const Classes = req.body.Classes;
  const profile_picture_url = req.body.profile_picture_url;

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
  //console.log(learner)
  mentorSchema.validate(mentor);
  mentor
    .save()
    .then(() => res.json("Added new mentor!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

async function getMentors(language, times, code) {
  let mentors = [];
  var matched_list = await Mentor.find({
    language: language,
    time: { $in: [...times] },
    "Classes.code": code,
    approved: true,
  });
  //console.log("matched list", matched_list)
  return matched_list;
}

router.route("/signup/findmatches/").post(async (req, res) => {
  const language = req.body.language;
  const times = req.body.times;
  //console.log(req.body)
  let codes = [];
  const subjects = req.body.subjects;
  subjects.forEach((subject) => {
    codes.push(subject.code);
  });

  //console.log(language, times, codes);
  let mentors = [];
  for (let code of codes) {
    try {
      var response = await getMentors(language, times, code);
      //choose 1 among many responses and append to mentors
      var theChosenMentor = -1; //in case of multiple compatible mentors, assign the student to the mentor who has minimum students
      let min = 1000; //maximum number of students is assumed to be 1000 (realistic assumption)
      for (let x of response) {
        let all_Classes = x.Classes;
        for (let Class of all_Classes) {
          //console.log(Class)
          if (Class.code == code) {
            //console.log(code, Class.students.length)
            if (Class.students.length <= min)
              theChosenMentor = x._id.toString();
          }
        }
      }
      // mentors ordered accordong to class codes order
      mentors.push(theChosenMentor);
      //console.log(mentors);
    } catch (err) {
      console.log(err);
    }
  }
  res.json(mentors);
});

/* router.route("/updateId/:id").post((req, res) => {
  Mentor.findById(req.params.id)
    .then((mentor) => {
      mentor.name = req.body.name;
      name
        .save()
        .then(() => res.json("mentor updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
}); */

module.exports = router;
// normal update by phone
router.route("/assign/update-by-phone/:phone").post(async (req, res) => {
  let phone = req.params.phone;
  let data = req.body;
  console.log(phone, data);
  await Mentor.findOneAndUpdate({ phone }, { $set: data });
  res.json("ok");
});

// normal update by id
router.route("/update-by-id/:id").post(async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  console.log(id, data);
  await Mentor.findByIdAndUpdate(id, { $set: data });
  res.json("ok");
});

// push students ID to mentor used after matching
router.route("/assign/update-by-id/:id").post(async (req, res) => {
  console.log("update route");

  let mentor_id = req.params.id;
  let class_code = req.body.class_code;
  let learner_id = req.body.learner_id;

  console.log("to be added : ", mentor_id, class_code, learner_id);

  let mentor = await Mentor.findById(mentor_id);

  //await Mentor.findByIdAndUpdate(mentor_id, {$addToSet : {}})

  let classes = mentor.Classes;

  for (let i = 0; i < classes.length; i++) {
    if (classes[i].code === class_code) {
      mentor.Classes[i].students.push({ id: learner_id, consent: false });
      console.log("students after pushing : ", mentor.Classes[i].students);
      //const field = "Classes." + i + ".students";
      //await Mentor.findByIdAndUpdate(mentor_id, {
      //$addToSet: { field: [{ _id: learner_id }] },
      //});
    }
  }

  mentor
    .save()
    .then(() => res.json("Mentor status updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/remove-learner/:id").post(async (req, res) => {
  let mentor_id = req.params.id;
  let class_code = req.body.class_code;
  let learner_id = req.body.learner_id;

  console.log(
    "data recieved in remove route : ",
    mentor_id,
    class_code,
    learner_id
  );

  let mentor = await Mentor.findById(mentor_id);

  let classes = mentor.Classes;

  for (let i = 0; i < classes.length; i++) {
    if (classes[i].code === class_code) {
      const stu_tmp = mentor.Classes[i].students.filter(
        (stu) => stu.id != learner_id
      );
      console.log("students array after removing : ", stu_tmp);
      mentor.Classes[i].students = stu_tmp;
      break;
    }
  }

  mentor
    .save()
    .then(() => res.json("Mentor status updated!"))
    .catch((err) => res.status(400).json("Error: " + err));

  //console.log(id, data);
  //await Mentor.findByIdAndUpdate(id, { $set: data });
  //res.json("ok");
});

router.route("/get-data/id/:id").get(async (req, res) => {
  let id = req.params.id;
  let data = await Mentor.findById(id).exec();
  res.json(data);
});

router.route("/get-data/phone/:phone").get(async (req, res) => {
  let phone = req.params.phone;
  let data = await Mentor.findOne({ phone }).exec();
  res.json(data);
});

//@ts-check
const express = require("express");
const router = express.Router();
const Mentor = require("../models/mentor.model");
const mentors = require("../controllers/mentor");

// TODO : needs to discuss with shrretes the use of this route in feedback
router.route("/login/submitmentor").get((req, res) => {
  Mentor.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("notfound"));
});

router.route("/signup/creatementor").post(mentors.createMentor);

router.route("/signup/findmatches/").post(mentors.findMatches);

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

// normal update by phone
router
  .route("/assign/update-by-phone/:phone")
  .post(mentors.updateMentorByPhone);

// normal update by id
router.route("/update-by-id/:id").post(mentors.updateMentorById);

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

router.route("/remove-learner/:id").post(mentors.removeLearnerById);

router.route("/get-data/id/:id").get(mentors.getMentorById);

router.route("/get-data/phone/:phone").get(mentors.getMentorByPhone);

router.route("/get/mentors/:status").get(mentors.getMentorStatus);

module.exports = router;

//@ts-check
const express = require("express");
const router = express.Router();
var Learner = require("../models/learner.model");

router.route("/login/submitlearner").get((req, res) => {
  Learner.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("notfound"));
});

router.route("/signup/createlearner").post(async (req, res) => {
  const phone = req.body.phone;
  const name = req.body.name;
  const email = req.body.email;
  const language = req.body.language;
  const times = req.body.times;
  const Class = req.body.Class;
  const profile_picture_url = req.body.profile_picture_url;
  const subjects = req.body.subjects;
  const NIOS_status = req.body.NIOS_status;
  //console.log(subjects);
  const learner = new Learner({
    phone,
    name,
    email,
    language,
    times,
    Class,
    profile_picture_url,
    subjects,
    NIOS_status,
  });
  //console.log(learner)
  learner
    .save()
    .then(() => res.json("Added new learner!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//new version for update route
router.route("/assign/update/:phone").post(async (req, res) => {
  let phone = req.params.phone;
  let data = req.body;
  console.log(phone, data);
  await Learner.findOneAndUpdate({ phone }, { $set: data });
  res.json("ok");
});

router.route("/update/id/:id").post(async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  console.log(id, data);
  await Learner.findByIdAndUpdate(id, { $set: data });
  res.json("ok");
});

router.route("/get-data/id/:id").get(async (req, res) => {
  let id = req.params.id;
  let data = await Learner.findById(id).exec();
  res.json(data);
});

router.route("/get-data/phone/:phone").get(async (req, res) => {
  let phone = req.params.phone;
  let data = await Learner.findOne({ phone }).exec();
  res.json(data);
});

module.exports = router;

const match = require("./matching.learner");

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
  const time = req.body.time;
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
    time,
    Class,
    profile_picture_url,
    subjects,
    NIOS_status,
  });
  //console.log(learner)
  //matching algorithm
  learner
    .save()
    .then(() => res.json("Added new learner!"))
    .catch((err) => res.status(400).json("Error: " + err));
  //const data = await match("English", "Morning", ["HIN7", "SCI7"]);
  console.log("Printing the data", data);
});

/* router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id).then(user => {

    user.username=req.body.username;
    user.password=req.body.password;

    user.save().then(() => res.json('Password updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
}); */

module.exports = router;

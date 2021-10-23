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
  //matching algorithm
  learner
    .save()
    .then(() => res.json("Added new learner!"))
    .catch((err) => res.status(400).json("Error: " + err));
  //const data = await match("English", "Morning", ["HIN7", "SCI7"]);
  //console.log("Printing the data", data);
});

/*
previous version of update route

router.route("/assign/update/:phone").post((req, res) => {
  //console.log(req)
  //console.log("req.body", req.body)
  Learner.find({ phone: req.body.phone })
    .then((learners) => {
      //console.log("Learners", learners)
      //console.log(users.length)
      if (learners.length == 0) {
        console.log("learner not found");
        return;
      }
      let learner = learners[0];
      //learner.name = "HAPPY"
      learner.subjects = req.body.subjects;
      console.log(learner.subjects);
      //assign values here
      //console.log("User", user)
      learner
        .save()
        .then(() => res.json("Learner status updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
}); */

//new version for update route

router.route("/assign/update/:phone").post(async (req, res) => {
  let phone = req.params.phone;
  let data = req.body;
  console.log(phone, data);
  await Learner.findOneAndUpdate({ phone }, { $set: data });
  res.json("ok");
});

/* router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id).then(user => {

    user.username=req.body.username;
    user.password=req.body.password;

    user.save().then(() => res.json('Password updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
}); */

router.route("/get-data/:id").get(async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let data = await Learner.findById(id).exec();
  console.log(data._id.toString());
  res.json(data);
});

router.route("/get-data/:phone").get(async (req, res) => {
  let phone = req.params.phone;
  console.log(phone);
  let data = await Learner.findOne({ phone }).exec();
  console.log(data._id.toString());
  res.json(data);
});

module.exports = router;

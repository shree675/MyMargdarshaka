//@ts-check
const express = require("express");
const router = express.Router();
const Learner = require("../models/learner.model");
const learners = require("../controllers/learner");

router.route("/login/submitlearner").get((req, res) => {
  Learner.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("notfound"));
});

router.route("/signup/createlearner").post(learners.createLearner);

router.route("/assign/update/:phone").post(learners.updateLearnerByPhone);

router.route("/update/id/:id").post(learners.updateLearnerById);

router.route("/get-data/id/:id").get(learners.getLearnerById);

router.route("/get-data/phone/:phone").get(learners.getLearnerByPhone);

module.exports = router;

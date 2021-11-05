//@ts-check
const express = require("express");
const router = express.Router();
var Feedback = require("../models/feedback.model");

router.route("/api/submitfeedback").post((req, res) => {
  const phone = req.body.phone;
  const issueSubject = req.body.issueSubject;
  const issueType = req.body.issueType;
  const issueBody = req.body.issueBody;
  const timestamp = req.body.timestamp;
  const username = req.body.username;
  const assignedTo = req.body.assignedTo;
  const status = req.body.status;
  const feedback = new Feedback({
    phone,
    issueSubject,
    issueType,
    issueBody,
    username,
    assignedTo,
    status,
    timestamp,
  });
  feedback
    .save()
    .then(() => res.json("Feedback successfullly submitted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getfeedbacks").get((req, res) => {
  Feedback.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("notfound"));
});

router.route("/update/:id").post((req, res) => {
  let id = req.params.id;
  let data = req.body;
  Feedback.findByIdAndUpdate(id, { $set: data }, { new: true }, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  res.json("ok");
});

module.exports = router;

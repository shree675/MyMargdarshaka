const express = require("express");
const router = express.Router();
var Feedback = require("../models/feedback.model");

router.route("/api/submitfeedback").post((req, res) => {
  const phone = req.body.phone;
  const issueSubject = req.body.issueSubject;
  const issueType = req.body.issueType;
  const issueBody = req.body.issueBody;
  const timestamp = req.body.timestamp;
  const feedback = new Feedback({
    phone,
    issueSubject,
    issueType,
    issueBody,
    timestamp,
  });
  feedback
    .save()
    .then(() => res.json("Feedback successfullly submitted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

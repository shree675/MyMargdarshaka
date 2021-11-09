//@ts-check
const express = require("express");
const router = express.Router();
const feedback = require("../controllers/feedback");

router.route("/api/submitfeedback").post(feedback.submitfeedback);

router.route("/getfeedbacks").get(feedback.getfeedbacks);

router.route("/update/:id").post(feedback.update);

module.exports = router;

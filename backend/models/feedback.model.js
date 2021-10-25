//@ts-check
/*
 * The feedback collection is used to store all issues submitted by users as feedback
 * They will be fetched and available for the admin to resolve them
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Feedback = new Schema({
  phone: {
    type: String,
    required: true,
  },
  issueSubject: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    enum: ["Report Abuse", "Platform Issue", "Question", "Other"],
  },
  issueBody: {
    type: String,
  },
  username: {
    type: String,
  },
  timestamp: {
    type: String,
  },
});

module.exports = mongoose.model("Feedback", Feedback);

//@ts-check
/*
 * The user table is used to keep a list of all users, both learners and mentors
 * Whether they have sign up successfully or not, helps route them correctly and prevent duplicate sign-ups
 * Will be used in the later release for the ban user functionality
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  phone: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
    enum: ["learner", "mentor"],
    default: "learner",
  },
  valid_signup: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_banned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", User);

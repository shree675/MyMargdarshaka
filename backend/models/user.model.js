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
    default: "learner",
  },
  valid_signup: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("User", User);

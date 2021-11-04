//@ts-check
/*
 * The mentor collection stores all learners who have successfully sign up
 * Complete information including their assigned students and a checklist of subtopic completed in each class code
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let chapter = new Schema({
  name: {
    type: String,
    required: true,
  },
  subtopics: {
    type: [[String, Boolean]],
    default: [["Introduction", false]], //Pairs of subtopic and completion status
  },
});

let Mentor = new Schema({
  phone: {
    type: String,
    required: true,
    /* unique: true */
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: "NA",
  },
  language: {
    type: String,
    enum: ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"],
    /* required: true */
  },
  time: {
    //use enum here
    type: String,
    enum: ["Morning", "Afternoon", "Evening"],
    /* required: true */
  },
  approved: {
    type: Boolean,
    default: true, // remember to change to false
  },

  // open application means approved and rejected are false.
  // after rejected by admin, this is set to true
  rejected: {
    type: Boolean,
    default: false,
  },

  Classes: {
    type: [
      {
        code: { type: String, required: true },
        students: [{ id: { type: String }, consent: { type: Boolean } }],
        chapters: {
          type: [chapter],
        },
      },
    ],

    /* required: true */
  },

  profile_picture_url: {
    type: String,
    default:
      "https://media.istockphoto.com/vectors/user-profile-icon-flat-red-round-button-vector-illustration-vector-id1162440985?k=20&m=1162440985&s=170667a&w=0&h=cQJ5HDdUKK_8nNDd_6RBoeDQfILERZnd_EirHTi7acI=",
  },
});

(module.exports = mongoose.model("Mentor", Mentor)),
  mongoose.model("chapter", chapter);

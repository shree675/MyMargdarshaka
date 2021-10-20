const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const data = require("../../client/src/data")
//import data from '../../client/src/data'

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

let Learner = new Schema({
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
    /* enum: data.langs, */
    enum: ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"],
    /* required: true */
  },
  times: {
    //TODO: change this name to times
    type: [String],
    enum: ["Morning", "Afternoon", "Evening"],
    /* required: true */
  },
  Class: {
    type: Number,
    /* required: true */
  },
  profile_picture_url: {
    type: String,
    default:
      "https://media.istockphoto.com/vectors/user-profile-icon-flat-red-round-button-vector-illustration-vector-id1162440985?k=20&m=1162440985&s=170667a&w=0&h=cQJ5HDdUKK_8nNDd_6RBoeDQfILERZnd_EirHTi7acI=",
  },
  subjects: {
    type: [
      {
        code: { type: String, required: true },
        mentor_id: { type: Number, default: -1 },
        consent: { type: Boolean, default: false },
        chapters: {
          type: [chapter],
        },
      },
    ],
    /* required: true */
  },

  NIOS_status: {
    type: String,
    default: 'I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM',
    enum: ['I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM', 'I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM', 'I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM', 'I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM']
  },
  //1: I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM
  //2: I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM
  //3: I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM
  //4: I DIDN’T REGISTER FOR NIOS / DIDN’T TAKE THE EXAM
});

module.exports = mongoose.model("Learner", Learner);

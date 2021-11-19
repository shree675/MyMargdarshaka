//@ts-check
//Joi Schemas help validate the format of the data before being pushed to the database
//NOTE: They have only been setup, they are yet to be added everywhere in the project
const Joi = require("joi");

module.exports.feedbackSchema = Joi.object({
  phone: Joi.string().required().length(10),
  issueSubject: Joi.string().required(),
  issueType: Joi.valid(
    "Report abuse",
    "Platform issue",
    "Question",
    "Other"
  ).required(),
  issueBody: Joi.string().required(),
  timestamp: Joi.date().timestamp(),
});

module.exports.learnerSchema = Joi.object({
  phone: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email(),
  language: Joi.string().valid(
    "Telugu",
    "Hindi",
    "English",
    "Kannada",
    "Malayalam"
  ),
  time: Joi.string().valid("Morning", "Afternoon", "Evening"),
  profile_picture_url: Joi.string().uri(),
  // NIOS_status: Joi.string().valid("I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM")
});

module.exports.mentorSchema = Joi.object({
  phone: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email(),
  language: Joi.string().valid(
    "Telugu",
    "Hindi",
    "English",
    "Kannada",
    "Malayalam"
  ),
  time: Joi.string().valid("Morning", "Afternoon", "Evening"),
  approved: Joi.boolean().required(),
  profile_picture_url: Joi.string().uri(),
});

module.exports.userSchema = Joi.object({
  phone: Joi.string().required(),
  user_type: Joi.string().required().default("learner"),
  valid_signup: Joi.boolean().required().default(false),
});

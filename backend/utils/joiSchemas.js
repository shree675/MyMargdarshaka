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
  phone: Joi.string().required().length(10),
  name: Joi.string().required(),
  email: Joi.string().email(),
  language: Joi.string().valid("telugu", "hindi", "english", "kannada"),
  time: Joi.date().timestamp(),
  profile_picture_url: Joi.string().uri(),
  // NIOS_status: Joi.string().valid("I HAVE REGISTERED FOR NIOS AND TOOK THE EXAM")
});

module.exports.mentorSchema = Joi.object({
  phone: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email(),
  language: Joi.string().valid("telugu", "hindi", "english", "kannada"),
  time: Joi.date().timestamp(),
  approved: Joi.boolean().required(),
  profile_picture_url: Joi.string().uri(),
  // Classes?
});

module.exports.userSchema = Joi.object({
  phone: Joi.string().required(),
  user_type: Joi.string().required().default("learner"),
  valid_signup: Joi.boolean().required().default(false),
});

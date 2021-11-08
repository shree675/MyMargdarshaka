const Learner = require("../models/learner.model");

module.exports.createLearner = async (req, res) => {
  const {
    phone,
    name,
    email,
    language,
    times,
    Class,
    profile_picture_url,
    subjects,
    NIOS_status,
  } = req.body;
  //console.log(subjects);
  const learner = new Learner({
    phone,
    name,
    email,
    language,
    times,
    Class,
    profile_picture_url,
    subjects,
    NIOS_status,
  });
  //console.log(learner)
  learner
    .save()
    .then(() => res.json("Added new learner!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports.updateLearnerByPhone = async (req, res) => {
  let phone = req.params.phone;
  let data = req.body;
  await Learner.findOneAndUpdate({ phone }, { $set: data });
  res.json("ok");
};

module.exports.updateLearnerById = async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  await Learner.findByIdAndUpdate(id, { $set: data });
  res.json("ok");
};

module.exports.getLearnerById = async (req, res) => {
  let id = req.params.id;
  let data = await Learner.findById(id).exec();
  res.json(data);
};

module.exports.getLearnerByPhone = async (req, res) => {
  let phone = req.params.phone;
  let data = await Learner.findOne({ phone }).exec();
  res.json(data);
};

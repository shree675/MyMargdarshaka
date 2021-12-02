const Learner = require("../models/learner.model");

// route to create a new learner
module.exports.createLearner = async (req, res) => {
  const { phone, name, email, language, times, Class, profile_picture_url, subjects, NIOS_status } = req.body;
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
  learner
    .save()
    .then(() => res.json("Added new learner!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

// route to update learner
module.exports.updateLearnerByPhone = async (req, res) => {
  let phone = req.params.phone;
  let data = req.body;
  await Learner.findOneAndUpdate({ phone }, { $set: data });
  res.json("ok");
};

// route to update learner
module.exports.updateLearnerById = async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  await Learner.findByIdAndUpdate(id, { $set: data });
  res.json("ok");
};

// route to get all learners from the database
module.exports.getLearnerById = async (req, res) => {
  let id = req.params.id;
  let data = await Learner.findById(id).exec();
  res.json(data);
};

// route to get all learners from the database
module.exports.getLearnerByPhone = async (req, res) => {
  let phone = req.params.phone;
  console.log("phone : ", phone);
  let data = await Learner.findOne({ phone }).exec();
  console.log("data : ", data);
  res.json(data);
};

// route to search a particular learner
module.exports.search = async (req, res) => {
  let parameter = req.params.id;
  const results = await Learner.find({
    phone: { $regex: parameter, $options: "i" },
  });
  const results2 = await Learner.find({
    name: { $regex: parameter, $options: "i" },
  });
  res.send(results.concat(results2));
};

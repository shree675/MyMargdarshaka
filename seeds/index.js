const axios = require("axios");
const mongoose = require("mongoose");
const Mentor = require("../backend/models/mentor.model");
const Learner = require("../backend/models/learner.model");
const { mentorSchema, learnerSchema } = require("../backend/utils/joiSchemas");
const mentors = require("./dummy_mentors.json");
const learners = require("./dummy_learners.json");
const { post } = require("../backend/routes/learner.router");

const url = "mongodb://localhost:27017/my-margdarshaka";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connection open");
});

const seedDB = async () => {
  console.log("seeding mentors: start");
  await Mentor.deleteMany({}).catch((e) => console.log(e));
  for (let mentor of mentors) {
    // console.log(mentor);
    const { error } = mentorSchema.validate(mentor, { allowUnknown: true });
    if (error) {
      break;
    }
    const m = new Mentor(mentor);
    await m.save().catch((e) => console.log(e));
  }
  console.log("seeding mentors: done");

  console.log("seeding learner: start");
  await Learner.deleteMany({}).catch((e) => console.log(e));
  for (let learner of learners) {
    // console.log(learner);
    const { error } = learnerSchema.validate(learner, { allowUnknown: true });
    if (error) {
      console.log(error);
      break;
    }
    const l = new Learner(learner);
    await l
      .save()
      // .then((t) => console.log(t))
      .catch((e) => console.log("ERROR: ", e));

    // await axios
    //   .post(`/api/learner/signup/createlearner`, learner)
    //   .then((res) => console.log("Pushing Sign up data"));

    // post(`/api/learner/signup/createlearner`, learner).then((res) => {
    //   console.log("Pushing Sign up data");
    // });
  }

  console.log("seeding learner: done");
};

seedDB().then(() => {
  db.close().then(() => console.log("connection closed"));
});

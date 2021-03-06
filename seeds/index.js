//@ts-check

const mongoose = require("mongoose");
const Mentor = require("../backend/models/mentor.model");
const Learner = require("../backend/models/learner.model");
const User = require("../backend/models/user.model");
const Admin = require("../backend/models/admin.model");
const { mentorSchema, learnerSchema } = require("../backend/utils/joiSchemas");
const mentors = require("./dummy_mentors.json");
const learners = require("./dummy_learners.json");
const admins = require("./dummy_admin.json");

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
  await User.deleteMany({}).catch((err) => console.log(err));

  await Admin.deleteMany({}).catch((err) => console.log(err));
  for (let admin of admins) {
    console.log(admin);
    const newAdmin = new Admin(admin);
    await newAdmin.save().catch((err) => console.log(err));
  }

  console.log("seeding mentors: start");
  await Mentor.deleteMany({}).catch((e) => console.log(e));
  for (let mentor of mentors) {
    const { error } = mentorSchema.validate(mentor, { allowUnknown: true });
    if (error) {
      break;
    }
    const m = new Mentor(mentor);
    await m.save().catch((e) => console.log(e));
  }
  console.log("seeding mentors: done");

  console.log("seeding learners: start");
  await Learner.deleteMany({}).catch((e) => console.log(e));
  for (let learner of learners) {
    const { error } = learnerSchema.validate(learner, { allowUnknown: true });
    if (error) {
      console.log(error);
      break;
    }
    const l = new Learner(learner);
    await l.save().catch((e) => console.log("ERROR: ", e));
  }

  console.log("seeding learners: done");
};

seedDB().then(() => {
  db.close().then(() => console.log("connection closed"));
});

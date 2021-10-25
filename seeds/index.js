const mongoose = require("mongoose");
const Mentor = require("../backend/models/mentor.model");
const { mentorSchema } = require("../backend/utils/joiSchemas");
const mentors = require("./dummy_data.json");

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
  await Mentor.deleteMany({}).catch((e) => console.log(e));
  console.log("before");
  for (let mentor of mentors) {
    // console.log(mentor);
    const valid = mentorSchema.validate(mentor, { allowUnknown: true });
    const m = new Mentor(mentor);
    await m.save().catch((e) => console.log(e));
  }
  console.log("after");
};

seedDB().then(() => {
  db.close().then(() => console.log("connection closed"));
});

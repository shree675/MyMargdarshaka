//@ts-check
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const connectionString = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());
/* app.use(express.json()); */

mongoose.connect(connectionString);
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//-------------------------------------------
app.use(cors());

// app.get("/api/message", (req, res) => {
//     res.send("Message from the server: If you are seeing this message, then it means the app is successfully deployed");
// });

const learnerRouter = require("./backend/routes/learner.router");
const mentorRouter = require("./backend/routes/mentor.router");
const userRouter = require("./backend/routes/user.router");
const feedbackRouter = require("./backend/routes/feedback.router");
const adminRouter = require("./backend/routes/admin.router");
/* const prefRouter=require('./backend/routes/preference');
const apiRouter=require('./backend/routes/api');
 */
app.use("/api/learner", learnerRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/user", userRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/admin", adminRouter);
/* app.use('/pref',prefRouter);
app.use('/api',apiRouter); */

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

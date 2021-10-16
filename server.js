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

app.get("/api/message", (req, res) => {
    res.send("Message from the server: If you are seeing this message, then it means the app is successfully deployed");
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

<<<<<<< HEAD

const learnerRouter=require('./backend/routes/learner.router');
const mentorRouter=require('./backend/routes/mentor.router');
const userRouter=require('./backend/routes/user.router');
=======
const learnerRouter = require("./backend/routes/learner");
const mentorRouter = require("./backend/routes/mentor");
const userRouter = require("./backend/routes/user");
const feedbackRouter = require("./backend/routes/feedback");
>>>>>>> 1eced6044c20c848aec8168e4c2fad76bc0e7b52
/* const prefRouter=require('./backend/routes/preference');
const apiRouter=require('./backend/routes/api');
 */
app.use("/learner", learnerRouter);
app.use("/mentor", mentorRouter);
app.use("/user", userRouter);
app.use("/feedback", feedbackRouter);
/* app.use('/pref',prefRouter);
app.use('/api',apiRouter); */

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

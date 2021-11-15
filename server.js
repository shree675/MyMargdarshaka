//@ts-check
require("dotenv").config({ path: "./.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const Admin = require("./backend/models/admin.model");

//IMPORTANT NOTE: The connection string is available in the config.env file which is not included in the
//GitHUb repository. Please add it to your local repo manually when you wish to run the web-app locally
const connectionString = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "3mb" }));
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

// MIDDLE WARE AUTH ------------------------------------------------------------------------
var admin = require("firebase-admin");
var serviceAccount = JSON.parse(
  Buffer.from(process.env.SERVICE_ACCOUNT_CRED, "base64").toString()
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.json(401);
    return;
  }
  const tmp = authHeader.split(" ");

  if (tmp[0] === "Bearer") {
    const idToken = tmp[1];
    console.log("idToken -> ", idToken);

    if (!idToken) {
      res.json(401);
    }
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        //console.log(decodedToken);
        const uid = decodedToken && decodedToken.uid;
        if (uid != null && uid != undefined) next();
      })
      .catch((error) => {
        res.json(401);
      });
  } else if (tmp[0] === "Basic") {
    const [username, password] = tmp[1].split(":");
    let r = await Admin.find({ username, password });
    if (r.length > 0) {
      next();
    } else {
      res.json(401);
    }
  } else {
    res.json(401);
  }
}
// -----------------------------------------------------------------------------

app.use("/api/learner", authMiddleware, learnerRouter);
app.use("/api/mentor", authMiddleware, mentorRouter);
app.use("/api/user", userRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/admin", adminRouter);
// app.use("/api/admin", authMiddleware, adminRouter);

// app.get("*", (req, res) => {
//   throw new Error("Page Not Found");
// });

// app.use((err, req, res, next) => {
//   console.log("BAD ERROR");
//   // render the error page ... HOW?
// });

/* app.use('/pref',prefRouter);
app.use('/api',apiRouter); */

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

//import _ from "lodash"
const lodash = require("lodash");
const express = require("express");
const router = express.Router();
var Mentor = require("../models/mentor.model");

router.route("/login/submitmentor").get((req, res) => {
  Mentor.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("notfound"));
});

router.route("/signup/creatementor").post((req, res) => {
  const phone = req.body.phone;
  const name = req.body.name;
  const email = req.body.email;
  const language = req.body.language;
  const time = req.body.time;
  const approved = req.body.approved;

  //const deepCopyWithLodashCloneDeep = _.cloneDeep(nestedArray)
  const Classes = lodash.cloneDeep(req.body.Classes);
  //const Classes = req.body.Classes;
  //console.log(req.body)
  console.log(req.body.Classes);
  //console.log(req.body.Classes[0].name)
  //let t = req.body.Classes[0]
  //console.log(t.chapters)
  const profile_picture_url = req.body.profile_picture_url;

  const mentor = new Mentor({
    phone,
    name,
    email,
    language,
    time,
    approved,
    Classes,
    profile_picture_url,
  });
  //console.log(learner)
  mentor
    .save()
    .then(() => res.json("Added new mentor!"))
    .catch((err) => res.status(400).json("Error: " + err));

});

/* router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id).then(user => {

    user.username=req.body.username;
    user.password=req.body.password;

    user.save().then(() => res.json('Password updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
}); */

module.exports = router;

//@ts-check
const express = require("express");
const router = express.Router();
var Admin = require("../models/admin.model");

router.route("/login/submitadmin").get((req, res) => {
  Admin.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(null));
});
//admins just need sign in functionality for now. No need update functionality
module.exports = router;

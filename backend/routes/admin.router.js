//@ts-check
const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");

router.route("/login/submitadmin").get(admin.login);

module.exports = router;

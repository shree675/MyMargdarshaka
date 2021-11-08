//@ts-check
const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");

router.route("/login/submitadmin").get(admin.login);
//admins just need sign in functionality for now. No need update functionality
module.exports = router;

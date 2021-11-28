//@ts-check

const Admin = require("../models/admin.model");
const User = require("../models/user.model");

// route for authentication
module.exports.login = (req, res) => {
  Admin.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(null));
};

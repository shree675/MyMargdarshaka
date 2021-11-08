const Admin = require("../models/admin.model");

module.exports.login = (req, res) => {
  Admin.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(null));
};

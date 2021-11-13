//@ts-check

const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const atlasPlugin = require("mongoose-atlas-search");

module.exports.login = (req, res) => {
  Admin.find()
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(null));
};

module.exports.search = async (req, res) => {
  let parameter = req.params.id;
  console.log(parameter);
  atlasPlugin.initialize({
    model: User,
    overwriteFind: true,
    searchKey: "default",
    addFields: {
      phone: "$_phone",
      id: "$_id",
    },
    searchFunction: (query) => {
      console.log(query);
      return {
        wildcard: {
          query: `${query}*`,
          path: "phone",
          allowAnalyzedField: true,
        },
      };
    },
  });
  // const results = await User.find({ default: "+919876543214" }).exec();
  // console.log(results);
  const results2 = await User.find({ phone: { $regex: "91987654321" } });
  console.log(results2);
};

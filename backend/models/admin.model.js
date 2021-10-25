//@ts-check
/*
 * The admin collection is used to keep a list admins with their username and password
 * Password is stored in the database using encryption aes-js encryption
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema(
  {
    username: {
      type: String,
      minlength: 6,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", Admin);

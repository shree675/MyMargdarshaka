const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Feedback = new Schema({
    phone: {
        type: String,
        required: true,
    },
    issueSubject: {
        type: String,
        required: true,
    },
    issueType: {
        type: String,
    },
    issueBody: {
        type: String,
    },
    timestamp: {
        type: String,
    },
});

module.exports = mongoose.model("Feedback", Feedback);

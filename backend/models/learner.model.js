const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Learner = new Schema({
    phone: {
        type: String
    },
    name: {
        type: String
    },
});

module.exports = mongoose.model('Learner', Learner);
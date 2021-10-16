const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Mentor = new Schema({
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: 'NA'
    },
    language: {
        type: String,
        /* required: true */
    },
    time: {
        type: String,
        /* required: true */
    },
    approved: {
        type: Boolean,
        default: false
    },
    Classes: {
        type: [{code: {type: String, required: true},
                students: [{id: {type: String}, consent: {type: Boolean},
                chapters: {
                    type: [{name: String, subtopics: {type: [(String,Boolean)], default: [('Introduction', false)]} //Pairs of subtopic and completion status 
                }]
                }
            }]    
    
        /* required: true */
        }]
    },
    profile_picture_url: {
        type: String,
        default: 'https://media.istockphoto.com/vectors/user-profile-icon-flat-red-round-button-vector-illustration-vector-id1162440985?k=20&m=1162440985&s=170667a&w=0&h=cQJ5HDdUKK_8nNDd_6RBoeDQfILERZnd_EirHTi7acI='
    }
});

module.exports = mongoose.model('Mentor', Mentor);
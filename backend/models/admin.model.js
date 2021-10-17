const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Admin=new Schema({
    username: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 1,
        required: true,
        unique: false
    }
},
{
    timestamps: true,
});

const Admin=mongoose.model('Admin',Admin);

module.exports= Admin;
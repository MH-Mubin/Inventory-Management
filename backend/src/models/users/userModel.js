

const mongoose = require('mongoose');

const dbSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

},{timestamps: true, versionKey: false});

const userModel = mongoose.model("users", dbSchema);
module.exports = userModel;
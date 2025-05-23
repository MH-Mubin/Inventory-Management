// database model for brands

const mongoose = require('mongoose');
const dbSchema = new mongoose.Schema({
    
    userEmail:{
        type: String,
    },
    brandName: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true, versionKey: false });


const brandsModel = mongoose.model("brands", dbSchema);
module.exports = brandsModel;
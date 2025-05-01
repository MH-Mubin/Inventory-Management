
// database model for brands

const mongoose = require('mongoose');
const dbSchema = new mongoose.Schema({
    
    userEmail:{
        type: String,
    },
    categoryName: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true, versionKey: false });


const brandsModel = mongoose.model("categories", dbSchema);
module.exports = brandsModel;
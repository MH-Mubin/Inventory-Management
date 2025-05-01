

// database model for brands

const mongoose = require('mongoose');
const dbSchema = new mongoose.Schema({
    
    userEmail:{
        type: String,
    },
    customerName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true, versionKey: false });


const brandsModel = mongoose.model("customers", dbSchema);
module.exports = brandsModel;
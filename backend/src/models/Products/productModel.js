




// database model for brands

const mongoose = require('mongoose');
const dbSchema = new mongoose.Schema({
    
    userEmail:{
        type: String,
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },
    brandId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands',
    },
    productName: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true, versionKey: false });


const productModel = mongoose.model("products", dbSchema);
module.exports = productModel;
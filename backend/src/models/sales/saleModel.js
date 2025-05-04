

// It will contain the summery of purchase history.
// This is Parent Model

// database model for sales Model

const mongoose = require('mongoose');
const dbSchema = new mongoose.Schema({
    
    userEmail:{
        type: String,
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
    },
    vatTax:{
        type: Number,
        default: 0,
    },
    discount:{
        type: Number,
        default: 0,
    },
    otherCost:{
        type: Number,
        default: 0,
    },
    shippingCost:{
        type: Number,
        default: 0,
    },
    grandTotal:{
        type: Number,
        default: 0,
    },
    note:{
        type: String,
        default: "",
    },    
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true, versionKey: false });


const salesModel = mongoose.model("sales", dbSchema);
module.exports = salesModel;
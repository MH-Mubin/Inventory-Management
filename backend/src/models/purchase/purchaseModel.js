

// It will contain the summery of purchase history.
// This is Parent Model

// database model for Purchase Model

const mongoose = require('mongoose');
const dbSchema = new mongoose.Schema({
    
    userEmail:{
        type: String,
    },
    supplierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'suppliers',
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


const purchaseModel = mongoose.model("purchases", dbSchema);
module.exports = purchaseModel;
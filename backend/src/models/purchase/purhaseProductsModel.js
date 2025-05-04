

// It will contain the details of an individual purchase, collaborating with the purchase history.

// This is Child Model
// database model for purchase products Model

const mongoose = require('mongoose');
const dbSchema = new mongoose.Schema({
    
    userEmail:{
        type: String,
    },
    purchaseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchases',
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    qty:{
        type: Number,
        required: true,
    },
    unitCost:{
        type: Number,
        required: true,
    },
    Total:{
        type: Number,
        default: 0,
    },    
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true, versionKey: false });


const purchaseProductModel = mongoose.model("purchasesProducts", dbSchema);
module.exports = purchaseProductModel;
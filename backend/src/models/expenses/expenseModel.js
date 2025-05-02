



// database model for expenses

const mongoose = require('mongoose');
const dbSchema = new mongoose.Schema({
    
    userEmail:{
        type: String,
    },
    typeID:{
        type: mongoose.Schema.Types.ObjectId
    },
    amount:{
        type: Number,
    },
    note:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true, versionKey: false });


const expenseModel = mongoose.model("expenses", dbSchema);
module.exports = expenseModel;
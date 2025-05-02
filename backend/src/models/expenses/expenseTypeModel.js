


// database model for expenseTypes

const mongoose = require('mongoose');
const dbSchema = new mongoose.Schema({
    
    userEmail:{
        type: String,
    },
    expenseTypeName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true, versionKey: false });


const expenseTypeModel = mongoose.model("expenseTypes", dbSchema,);
module.exports = expenseTypeModel;

const dataModel = require('../../models/expenses/expenseModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listOneJoinService = require('../../services/common/listOneJoinService');
const deleteService = require('../../services/common/deleteService')
const detailsByIdService = require('../../services/common/detailsByIdService')


exports.createExpense = async (req, res) => {
    let result = await createService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.updateExpense = async (req, res) => {
    let result = await updateService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.expenseList = async (req, res) => {
    let searchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    let searchArray = [{note: searchRgx}, {amount: searchRgx}, {'expenseType.expenseTypeName': searchRgx}]; // Adding search criteria for note, amount, and expense type name
    joinStage = {// Joining with expenseTypes collection to get the expense type details
        $lookup: {
            from: "expenseTypes",
            localField: "typeID",
            foreignField: "_id",
            as: "expenseType"
        }
    };
    let result = await listOneJoinService(req, dataModel, searchArray, joinStage);// Using the listOneJoinService to get the list of expenses with joined data

    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.deleteExpense = async (req,res) =>{
    let result = await deleteService (req, dataModel)
    res.status(200).json({
        data : result,
        error: result.error
    })
}


exports.expenseDetailsById = async (req, res) =>{
    let result = await detailsByIdService(req, dataModel)
    res.status(200).json(result)
}

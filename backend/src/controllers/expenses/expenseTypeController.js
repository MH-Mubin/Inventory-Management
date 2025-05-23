



const dataModel = require('../../models/expenses/expenseTypeModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listService = require('../../services/common/listService');
const dropdownService = require('../../services/common/dropdownService');
const detailsByIdService = require('../../services/common/detailsByIdService')


exports.createExpenseType = async (req, res) => {
    let result = await createService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.updateExpenseType = async (req, res) => {
    let result = await updateService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}


exports.expenseTypeList = async (req, res) => {
    let searchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    let searchArray = [{expenseTypeName: searchRgx}];
    let result = await listService(req, dataModel, searchArray);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.expenseTypeDropdown = async (req, res) => {
    let result = await dropdownService(req, dataModel, {_id:1, expenseName:1});
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.expenseTypeDetailsById = async (req, res) =>{
    let result = await detailsByIdService(req, dataModel)
    res.status(200).json(result)
}



const dataModel = require('../../models/categories/categoryModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listService = require('../../services/common/listService');
const dropdownService = require('../../services/common/dropdownService');


exports.createCategory = async (req, res) => {
    let result = await createService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.updateCategory = async (req, res) => {
    let result = await updateService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}


exports.categoryList = async (req, res) => {
    let searchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    let searchArray = [{categoryName: searchRgx}];
    let result = await listService(req, dataModel, searchArray);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.categoryDropdown = async (req, res) => {
    let result = await dropdownService(req, dataModel, {_id:1, categoryName:1});
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}
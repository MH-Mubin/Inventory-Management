


const dataModel = require('../../models/customers/customerModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listService = require('../../services/common/listService');
const dropdownService = require('../../services/common/dropdownService');


exports.createCustomer = async (req, res) => {
    let result = await createService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.updateCustomer = async (req, res) => {
    let result = await updateService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}


exports.customerList = async (req, res) => {
    let searchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}; // Creating a regex for case-insensitive search
    let searchArray = [{customerName: searchRgx},{phone: searchRgx},{email: searchRgx},{address: searchRgx}]; // Adding search criteria for name, phone, email, and address
    let result = await listService(req, dataModel, searchArray);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.customerDropdown = async (req, res) => {
    let result = await dropdownService(req, dataModel, {_id:1, customerName:1});
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}
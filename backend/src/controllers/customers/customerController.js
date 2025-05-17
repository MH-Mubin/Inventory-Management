


const dataModel = require('../../models/customers/customerModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listService = require('../../services/common/listService');
const dropdownService = require('../../services/common/dropdownService');
const salesModel = require('../../models/sales/saleModel');
const returnModel = require('../../models/returns/returnModel');
const associateService = require('../../services/common/checkAssociateService')
const deleteService = require('../../services/common/deleteService');
const { default: mongoose } = require('mongoose');
const detailsByIdService = require('../../services/common/detailsByIdService')


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

exports.customerDelete = async(req,res)=>{
    let deleteId = req.params.id;
    const objectId = new mongoose.Types.ObjectId(deleteId);
    let checkSalesAssociate = await associateService ({customerId:objectId}, salesModel);
    let checkReturnAssociate = await associateService ({customerId:objectId}, returnModel);
    if (checkSalesAssociate){
        res.status(200).json({status: "associate", data: "Associate with Sales"})
    }
    else if (checkReturnAssociate){
        res.status(200).json({status: "associate", data: "Associate with Returns"})
    }
    else{
        let result = await deleteService(req, dataModel);
        res.status(200).json(result)
    }
}

exports.customerDetailsById = async (req, res) =>{
    let result = await detailsByIdService(req, dataModel)
    res.status(200).json(result)
}

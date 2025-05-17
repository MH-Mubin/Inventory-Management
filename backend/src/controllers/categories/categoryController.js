


const dataModel = require('../../models/categories/categoryModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listService = require('../../services/common/listService');
const dropdownService = require('../../services/common/dropdownService');
const associateService = require('../../services/common/checkAssociateService')
const deleteService = require('../../services/common/deleteService');
const { default: mongoose } = require('mongoose');
const productModel = require('../../models/Products/productModel')
const detailsByIdService = require('../../services/common/detailsByIdService')


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

exports.categoryDelete = async(req,res)=>{
    let deleteId = req.params.id;
    const objectId = new mongoose.Types.ObjectId(deleteId);
    let checkAssociate = await associateService ({categoryId:objectId}, productModel);
    if (checkAssociate){
        res.status(200).json({status: "associate", data: "Associate with Products"})
    }
    else{
        let result = await deleteService(req, dataModel);
        res.status(200).json(result)
    }
}

exports.categoryDetailsById = async (req, res) =>{
    let result = await detailsByIdService(req, dataModel)
    res.status(200).json(result)
}

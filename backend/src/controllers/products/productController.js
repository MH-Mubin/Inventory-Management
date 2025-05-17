

const dataModel = require('../../models/Products/productModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listTwoJoinService = require('../../services/common/listTwoJoinService');
const associateService = require('../../services/common/checkAssociateService')
const deleteService = require('../../services/common/deleteService');
const { default: mongoose } = require('mongoose');
const salesProductModel = require('../../models/sales/saleProductsModel')
const returnProductModel = require('../../models/returns/returnProductsModel')
const purchaseProductModel = require('../../models/purchase/purhaseProductsModel')
const detailsByIdService = require('../../services/common/detailsByIdService')


exports.createProduct = async (req, res) => {
    let result = await createService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.updateProduct = async (req, res) => {
    let result = await updateService(req, dataModel);
    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.productList = async (req, res) => {
    let searchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    
    joinStage1 = {// Joining with categories collection to get the expense type details
        $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "categories"
        }
        
    };
    joinStage2 = {// Joining with brands collection to get the brand details
        $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "brands"
        }
    };
    let searchArray = [{productName: searchRgx}, {unit: searchRgx},{details: searchRgx},{'categories.categoryName': searchRgx}, {'brands.brandName': searchRgx}]; // Adding search criteria for note, amount, and expense type name

    let result = await listTwoJoinService(req, dataModel, searchArray, joinStage1, joinStage2);// Using the listOneJoinService to get the list of expenses with joined data

    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.productDelete = async(req,res)=>{
    let deleteId = req.params.id;
    const objectId = new mongoose.Types.ObjectId(deleteId);
    let checkSalesAssociate = await associateService ({productId:objectId}, salesProductModel);
    let checkReturnAssociate = await associateService ({productId:objectId}, returnProductModel);
    let checkPurchaseAssociate = await associateService ({productId:objectId}, purchaseProductModel);
    if (checkSalesAssociate){
        res.status(200).json({status: "associate", data: "Associate with Sales"})
    }
    else if (checkReturnAssociate){
        res.status(200).json({status: "associate", data: "Associate with Returns"})
    }
    else if (checkPurchaseAssociate){
        res.status(200).json({status: "associate", data: "Associate with Purchase"})
    }
    else{
        let result = await deleteService(req, dataModel);
        res.status(200).json(result)
    }
}


exports.productDetailsById = async (req, res) =>{
    let result = await detailsByIdService(req, dataModel)
    res.status(200).json(result)
}

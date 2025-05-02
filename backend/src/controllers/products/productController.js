

const dataModel = require('../../models/Products/productModel');
const createService = require('../../services/common/createService');
const updateService = require('../../services/common/updateService');
const listTwoJoinService = require('../../services/common/listTwoJoinService');

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
    let searchArray = [{productName: searchRgx}, {unit: searchRgx},{details: searchRgx},{'categories.name': searchRgx}, {'brands.name': searchRgx}]; // Adding search criteria for note, amount, and expense type name
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
    let result = await listTwoJoinService(req, dataModel, searchArray, joinStage1, joinStage2);// Using the listOneJoinService to get the list of expenses with joined data

    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}
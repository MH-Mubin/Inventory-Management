




const parentModel = require('../../models/returns/returnModel');// Importing the parent model for returns
const childModel = require('../../models/returns/returnProductsModel');// Importing the child model for return products
const createParentChildService = require('../../services/common/createParentChildService');
const listOneJoinService = require('../../services/common/listOneJoinService');
const deleteParentChildService = require('../../services/common/deleteParentChildService');
const detailsByIdService = require('../../services/common/detailsByIdService')


exports.createReturn = async (req, res) => {
    let result = await createParentChildService(req, parentModel, childModel, 'returnID');// Creating a return entry with parent and child models
    res.status(200).json(result);
};

exports.returnList = async (req, res) => {
    let searchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    
    joinStage = {// Joining with the customer collection to get customer details
        $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customer"
        }
    };
    let searchArray = [{note: searchRgx},{'customer.customerName': searchRgx},{'customer.phone': searchRgx},
        {'customer.email': searchRgx},{'customer.address': searchRgx}]; // Adding search criteria for note, amount, and expense type name

    let result = await listOneJoinService(req, parentModel, searchArray, joinStage);// Using the listOneJoinService to get the list of expenses with joined data

    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}

exports.returnDelete = async (req, res) => {
    let result = await deleteParentChildService(req, parentModel, childModel, 'returnID');// Deleting a return entry with parent and child models
    res.status(200).json(result);
}


exports.returnDetailsById = async (req, res) =>{
    let result = await detailsByIdService(req, dataModel)
    res.status(200).json(result)
}






const parentModel = require('../../models/purchase/purchaseModel');
const childModel = require('../../models/purchase/purhaseProductsModel');
const createParentChildService = require('../../services/common/createParentChildService');
const listOneJoinService = require('../../services/common/listOneJoinService');


exports.createReturn = async (req, res) => {
    let result = await createParentChildService(req, parentModel, childModel, 'returnId');// Creating a return entry with parent and child models
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
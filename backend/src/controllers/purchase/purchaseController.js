
const parentModel = require('../../models/purchase/purchaseModel');
const childModel = require('../../models/purchase/purhaseProductsModel');
const createParentChildService = require('../../services/common/createParentChildService');
const listOneJoinService = require('../../services/common/listOneJoinService');


exports.createPurchase = async (req, res) => {
    let result = await createParentChildService(req, parentModel, childModel, 'purchaseId');
    res.status(200).json(result);
};

exports.purchaseList = async (req, res) => {
    let searchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    
    joinStage = {// Joining with suppliers collection to get the supplier details
        $lookup: {
            from: "suppliers",
            localField: "supplierId",
            foreignField: "_id",
            as: "supplier"
        }
    };
    let searchArray = [{note: searchRgx},{'supplier.supplierName': searchRgx},{'supplier.phone': searchRgx},
        {'supplier.email': searchRgx},{'supplier.address': searchRgx}]; // Adding search criteria for note, amount, and expense type name

    let result = await listOneJoinService(req, parentModel, searchArray, joinStage);// Using the listOneJoinService to get the list of expenses with joined data

    res.status(200).json({
        message: result.message,
        data: result.data,
        error: result.error
    });
}
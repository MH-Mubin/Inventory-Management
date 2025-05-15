
const returnProductModel = require('../../models/returns/returnProductsModel');
const returnReportService = async (request) => {
    try{
        let userEmail = request.headers['email'];
        let fromDate = request.body['fromDate'];
        let toDate = request.body['toDate'];

        let data = await returnProductModel.aggregate([
            {$match: {email: userEmail, date:{$gte: new Date (fromDate), $lte: new Date (toDate)}}},
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: {$sum:"Total"}
                        }
                    }],
                    Rows: [
                        {$lookup: {from: "products", localField: "productId", foreignField: "_id", as: "products"}},
                        {$unwind: "$products"},
                        {$lookup: {from: "brands", localField: "products.brandId", foreignField: "_id", as: "brands"}},
                        {$lookup: {from: "categories", localField: "products.categoryId", foreignField: "_id", as: "categories"}}
                    ]
                }
            }
        ])
        return {status: 'success', data: data};
    }
    catch(error){
        return{status: 'fail', data: error.toString()};
    }
}

module.exports = returnReportService;
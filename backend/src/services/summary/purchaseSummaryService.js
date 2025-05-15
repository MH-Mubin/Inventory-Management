

const purchaseModel = require('../../models/purchase/purchaseModel')

const purchaseSummaryService = async (request)=>{
    try{
        let email = request.headers['email'];
        console.log(email)
        let data = await purchaseModel.aggregate([
            {$match: {userEmail: email}},
            {
                $facet:{
                    total:[{
                        $group:{
                            _id:0,
                            totalAmount: {$sum: "$grandTotal"}
                        }
                    }],
                    last30Days:[{
                        $group:{
                            _id: {$dateToString: {format:"%Y-%m-%d", date: "$createdAt"}},
                            TotalAmount: {$sum: "$grandTotal"}
                        }},
                    {$sort: {_id: -1}},
                    {$limit: 30}
                    ]
                }
            }
        ])
        return{status: "Success", data: data}
    }
    catch(error){
        return{status: 'fail', data: error.toString()}
    }
}

module.exports = purchaseSummaryService
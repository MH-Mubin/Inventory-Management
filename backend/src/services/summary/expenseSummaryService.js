
const expenseModel = require('../../models/expenses/expenseModel')

const expenseSummaryService = async (request)=>{
    try{
        let email = request.headers['email'];
        console.log(email)
        let data = await expenseModel.aggregate([
            {$match: {userEmail: email}},
            {
                $facet:{
                    total:[{
                        $group:{
                            _id:0,
                            totalAmount: {$sum: "$amount"}
                        }
                    }],
                    last30Days:[{
                        $group:{
                            _id: {$dateToString: {format:"%Y-%m-%d", date: "$createdAt"}},
                            TotalAmount: {$sum: "$amount"}
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

module.exports = expenseSummaryService
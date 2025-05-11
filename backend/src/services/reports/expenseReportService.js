
const expenseModel = require ('../../models/expenses/expenseModel')

const expenseReportService = async (request)=>{
    try{
        let userEmail = request.headers['email'];
        let fromDate = request.body['fromDate'];
        let toDate = request.body['toDate']

        let data = await expenseModel.aggregate([
            {$match: {email: userEmail, date:{$gte:new Date (fromDate), $lte: new Date (toDate)}}},
            {
                $facet:{
                    total: [{
                        $group:{
                            _id:0,
                            totalAmount:{$sum: '$amount'}
                        }
                    }],
                    rows:[
                        {$lookup:{from: 'expenseType', localField:'typeId', foreignField:'_id', as:'type'}}
                    ],
                }
            }

        ])
    }
    catch(error){
        return('fail')
    }
}

const expenseModel = require ('../../models/expenses/expenseModel')

const expenseReportService = async (request)=>{
    try{
        let email = request.headers['email'];
        let fromDate = request.body['fromDate'];
        let toDate = request.body['toDate']
        console.log("Email:", email);
        console.log("From:", fromDate);
        console.log("To:", toDate);

        let data = await expenseModel.aggregate([
            
            {$match: {userEmail: email, date:{$gte:new Date (fromDate), $lte: new Date (toDate)}}}, // here we checked 3 condition. user email, from date and to date.
            
            {
                $facet:{  // by using facet we are counting total amount using id, from expense
                    total: [{
                        $group:{
                            _id:0,
                            totalAmount:{$sum: '$amount'}
                        }
                    }],
                    rows:[
                        {$lookup:{from: 'expenseTypes', localField:'typeID', foreignField:'_id', as:'type'}} // by using lookup we are getting data from expenseTypes table by the localkey and foreignKey "typeID" and "_id"
                    ],
                }
            }

        ])
        return {status:'success', data: data}
    }
    catch(error){
        return {status:'fail', data: error.toString()}
    }
}

module.exports = expenseReportService
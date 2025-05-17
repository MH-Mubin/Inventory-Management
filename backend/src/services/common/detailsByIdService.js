const mongoose = require('mongoose')

const detailsByIdService = async (request, dataModel) =>{
    try{
        let detailsId = request.params.id;
        let email = request.headers['email'];

        const objectId = new mongoose.Types.ObjectId(detailsId);
        let queryObject = {}
        queryObject ['_id'] = objectId;
        queryObject ['userEmail'] = email; // if email can't get, this line need to check

        let data = await dataModel.aggregate([
            {$match: queryObject}
        ])
        return{status: 'success', data: data}
    }
    catch(error){
        return{Status: 'fail', data: error.toString()}
    }
}

module.exports = detailsByIdService;
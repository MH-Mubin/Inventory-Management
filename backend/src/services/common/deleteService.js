
const deleteService = async (request,model) => {
    try{
    let deleteID = request.params.id;
    let email = request.headers['email']

    let objQuery = {};
    objQuery['_id'] = deleteID;
    objQuery['userEmail'] = email;

    let deleteResult = await model.deleteMany(objQuery);

    return {status: 200,message: 'service deleted successfully', Delete: deleteResult }
    }
    catch(error){
        res.json({status: 500, message: 'Could not delete service', error: error.toString()});
    }

}

module.exports = deleteService
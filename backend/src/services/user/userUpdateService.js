

const userUpdateService = async (request, dataModel) => {
    try{
        let data = await dataModel.updateOne(
            {email: request.headers.email}, 
            {$set: request.body}
        );
        return {status: 200, message: "User's profile update successfull", data: data};
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}

module.exports = userUpdateService;

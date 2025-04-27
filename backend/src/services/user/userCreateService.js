

const userCreateService = async (request, dataModel) => {
    try{
        let postBody = request.body;
        let data = await dataModel.create(postBody);
        return {status: 200, message: "User Registration Successfull", data: data};
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}

module.exports = userCreateService;
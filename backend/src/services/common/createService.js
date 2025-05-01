// will be used to create new service in database


const createService = async (request, dataModel) => {
    try{
        let postBody = request.body;
        postBody.userEmail = request.headers['email']; // Adding user email to the request body

        let data = await dataModel.insertMany(postBody); // Creating new service in the database
        return {status: 200, message: "Service Created Successfully", data: data};
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}

module.exports = createService; // Exporting the function to be used in other files
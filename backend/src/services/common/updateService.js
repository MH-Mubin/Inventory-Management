// will be used to update data


const updateService = async (request, dataModel) => {
    try{
        let userEmail = request.headers['email']; // Getting the user email from the header
        let id = request.params.id; // Getting the id from the request params
        let postBody = request.body; // Extracting request body
        let data = await dataModel.updateOne({userEmail: userEmail, _id: id}, postBody); // Updating the document in the database
        return {status: 200, message: "Service Updated Successfully", data: data}; // Sending success response
    }
    catch(err){
        console.log(err); // Logging the error
        return {status: 500, message: "Internal Server Error", error: err.message}; // Sending error response
    }
}

module.exports = updateService; // Exporting the function to be used in other files
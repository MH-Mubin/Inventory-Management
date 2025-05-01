// will be used for select various kind of category using dropdown


const dropDownService = async (request, dataModel, Projection) => {
    try{ 
        let userEmail = request.headers['email']; // Getting the user email from the header
        let data = await dataModel.aggregate([
            {$match: {userEmail: userEmail}}, // Finding the document to update
            {$project : Projection} // Projecting the required fields
        ]);
        return {status: 200, message: "Dropdown data fetched successfully", data: data}; // Sending success response
    }
    catch(err){
        console.log(err); // Logging the error
        return {status: 500, message: "Internal Server Error", error: err.message}; // Sending error response
    }
}

module.exports = dropDownService; // Exporting the function to be used in other files
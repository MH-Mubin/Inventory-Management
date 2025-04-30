

const userUpdateService = async (request, dataModel) => {
    try{
        let data = await dataModel.updateOne(
            {email: request.headers.email}, 
            {$set: request.body}
        );
        // let email = request.headers['email']; //getting the email from the header
        // let reqBody = request.body; // Extracting request body
        // let data = await dataModel.updateOne({email: email}, reqBody); // Updating user data in the database
       // res.json({status:"success", message: "Profile Updated Successfully"}); // Sending success response

        return {status: 200, message: "User's profile update successfull", data: data};
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}

module.exports = userUpdateService;

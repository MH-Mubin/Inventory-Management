

const otpModel = require("../../models/users/otpModel");
const sendEmailUtility = require("../../utility/sendEmailUtility");


const userVerifyEmailService = async (request, dataModel) => {
    try{
        // Email verification process
        let email = request.params.email;
        let otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        let userCount = await dataModel.aggregate([
            { $match: { email: email } },
            { $count: "total" }
        ]);
        if (userCount.length > 0) {
            await otpModel.create({email: email, otp: otpCode});// OTP Insert
            let sendEmail = await sendEmailUtility(email, "Your OTP code is: "+otpCode,"Inventory Management System OTP Verification"); 
            if (sendEmail.status == 200) {
                return {status: 200, message: "OTP Sent to your email", data: sendEmail.data};
            } else {
                return {status: sendEmail.status, message: sendEmail.message};
            }
        } else {
            return {status: 404, message: "User not found"};
        }
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}

module.exports = userVerifyEmailService;


const otpModel = require("../../models/otpModel"); // Import the OTP model

const userVerifyOTPService = async (request, dataModel) => {
    try{
        let email = request.params.email;
        let otpCode = request.params.otpCode;
        let status = "Unused";
        let statusUpdate = "used";
        let otpCount = await dataModel.aggregate([
            { $match: { email: email, otp: otpCode, status: status } },
            { $count: "total" }
        ]);
        if (otpCount.length > 0) {
            let otpUpdate = await otpModel.updateOne({email: email, otp: otpCode}, {email: email, otp: otpCode,status: statusUpdate});// OTP Update
            return {status: 200, message: "OTP Verified Successfully", data: otpUpdate};
        } else {
            return {status: 404, message: "Invalid OTP"};
        }
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}

module.exports = userVerifyOTPService;
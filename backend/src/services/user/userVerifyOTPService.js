

const otpModel = require("../../models/users/otpModel"); // Import the OTP model

const userVerifyOTPService = async (req, dataModel) => {
    try{
        let email = req.params.email;
        let OTP = req.params.otpCode.toString(); // Convert OTP to string if it's a number
        let status = 'active';
        let statusUpdate = 'Used';

        let otpCount = await otpModel.findOne({ email: email, otp: OTP, status: status});
        console.log(otpCount);
        if (otpCount.length > 0 && otpCount[0].total > 0) {
//            console.log(otpCount);
            await otpModel.updateOne(
                { email: email, otp: OTP },
                { $set: { status: statusUpdate } }
            );
            return { status: 200, message: "OTP Verified Successfully" };
        }else{
            return { status: 404, message: "Invalid OTP" };
        }
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}


module.exports = userVerifyOTPService;
















// // const otpModel = require("../../models/otpModel"); // Import the OTP model

// // const userVerifyOTPService = async (request, dataModel) => {
// const otpModel = require("../../models/otpModel"); // Import the OTP model

// const userVerifyOTPService = async (request, dataModel) => {
//     try {
//         let email = request.params.email;
//         let OTP = request.params.otpCode.toString(); // Make sure it's string
//         let status = "active";
//         let statusUpdate = "Used";

//         console.log(email, OTP, status);

//         let existingOTP = await dataModel.findOne({ email: email, otp: OTP, status: status });

//         if (existingOTP) {
//             let otpUpdate = await otpModel.updateOne(
//                 { email: email, otp: OTP },
//                 { $set: { status: statusUpdate } }
//             );

//             return { status: 200, message: "OTP Verified Successfully", data: otpUpdate };
//         } else {
//             return { status: 404, message: "Invalid OTP" };
//         }
//     } catch (err) {
//         console.log(err);
//         return { status: 500, message: "Internal Server Error", error: err.message };
//     }
// }

// module.exports = userVerifyOTPService;



    // try{
    //     let email = request.params.email;
    //     let OTP = request.params.otpCode.toString(); // Convert OTP to string if it's a number
    //     let status = "active";
    //     let statusUpdate = "Used";
    //     let otpCount = await dataModel.aggregate([
    //         { $match: { email: email, otp: OTP, status: status } },
    //         { $count: "total" }
    //     ]);
    //    // console.log(email, OTP, status);

    //     if (otpCount.length > 0) {
    //         //let otpUpdate = await otpModel.updateOne({email: email, otp: OTP}, {email: email, otp: OTP,status: statusUpdate});// OTP Update
    //         let otpUpdate = await otpModel.updateOne({ email: email, otp: OTP }, 
    //             { $set: { status: statusUpdate } });
    //        // console.log(otpUpdate);
    //         if (otpUpdate.matchedCount === 0) {
    //             return { status: 404, message: "OTP not found or already used" };
    //         }            

    //         return {status: 200, message: "OTP Verified Successfully", data: otpUpdate};
    //     } else {
    //         return {status: 404, message: "Invalid OTP", error: err.message};
    //     }
    // }catch(err){
    //     console.log(err);
    //     return {status: 500, message: "Internal Server Error", error: err.message};
    // }
//}

// module.exports = userVerifyOTPService;
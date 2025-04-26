
// const otpModel = require("../../models/otpModel"); // Import the OTP model

// const userResetPassService = async (request, dataModel) => {
//     let email = request.params.email;
//     let otpCode = request.params.otpCode;
//     let newPassword = request.body.newPassword;
//     let statusUpdate = "used";
//     let status = "Unused";
//     try{
//         let otpCount = await otpModel.aggregate([
//             { $match: { email: email, otp: otpCode, status: statusUpdate } },
//             { $count: "total" }
//         ]);
//         if (otpCount.length > 0) {
//             let passUpdate = await dataModel.updateOne({email: email}, {password: newPassword});// Password Update
//             return {status: 200, message: "Password Updated Successfully", data: passUpdate};
//     }else{
//             return {status: 404, message: "Invalid OTP"};
//         }
// }catch(err){
//         console.log(err);
//         return {status: 500, message: "Internal Server Error", error: err.message};
//     }
// }

// module.exports = userResetPassService;



const otpModel = require("../../models/otpModel");
const bcrypt = require("bcrypt");

const userResetPassService = async (request, dataModel) => {
    const email = request.params.email;
    const otpCode = request.params.otpCode;
    const newPassword = request.body.newPassword;

    try {
        // Step 1: Check valid & unused OTP
        const otpCount = await otpModel.aggregate([
            { $match: { email, otp: otpCode, status: "Unused" } },
            { $count: "total" }
        ]);

        if (otpCount.length > 0) {
            // Step 2: Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Step 3: Update user password
            const passUpdate = await dataModel.updateOne(
                { email },
                { password: hashedPassword }
            );

            // Step 4: Mark OTP as used
            await otpModel.updateOne(
                { email, otp: otpCode },
                { status: "Used" }
            );

            return { status: 200, message: "Password Updated Successfully", data: passUpdate };
        } else {
            return { status: 404, message: "Invalid or Already Used OTP" };
        }

    } catch (err) {
        console.log(err);
        return { status: 500, message: "Internal Server Error", error: err.message };
    }
};

module.exports = userResetPassService;

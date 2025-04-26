

const dataModel = require("../../models/userModel"); // Import the user model
const otpModel = require("../../models/otpModel"); // Import the OTP model
const userCreateService = require("../../services/user/userCreateService");
const userLoginService = require("../../services/user/userLoginService");
const userVerifyOTPService = require("../../services/user/userVerifyOTPService");
const userResetPassService = require("../../services/user/userResetpassService"); 
const userUpdateService = require("../../services/user/userUpdateService");
const userVerifyEmailService = require("../../services/user/userVerifyEmailService");
const userDetailsService = require("../../services/user/userDetailsService");


exports.registration = async (req, res) => {
    let result = await userCreateService(req, dataModel);
    if (result.status == 200) {
        res.status(result.status).json({ message: result.message, data: result.data });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
}

exports.login = async (req, res) => {
    let result = await userLoginService(req, dataModel);
    if (result.status == 200) {
        res.status(result.status).json({ message: result.message, data: result.data });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
}

exports.profileUpdate = async (req, res) => {
    let result = await userUpdateService(req, dataModel);
    if (result.status == 200) {
        res.status(result.status).json({ message: result.message, data: result.data });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
}

exports.profileDetails = async (req, res) => {
    let result = await userDetailsService(req, dataModel);
    if (result.status == 200) {
        res.status(result.status).json({ message: result.message, data: result.data });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
}

exports.recoverVerifyEmail = async (req, res) => {
    let result = await userVerifyEmailService(req, dataModel);
    if (result.status == 200) {
        res.status(result.status).json({ message: result.message, data: result.data });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
}

exports.recoverVerifyOTP = async (req, res) => {
    let result = await userVerifyOTPService(req, dataModel);
    if (result.status == 200) {
        res.status(result.status).json({ message: result.message, data: result.data });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
}

exports.recoverResetPass = async (req, res) => {
    let result = await userResetPassService(req, dataModel);
    if (result.status == 200) {
        res.status(result.status).json({ message: result.message, data: result.data });
    } else {
        res.status(result.status).json({ message: result.message, error: result.error });
    }
}

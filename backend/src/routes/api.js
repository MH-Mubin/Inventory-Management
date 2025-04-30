

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/user/userController');
const brandsController = require('../controllers/brands/brandsController');

const router = express.Router();


// User Profile Routes

//before login
router.post('/registration', userController.registration); // User Registration
router.post('/login', userController.login); // User Login


//after login 
// need to add token in the header
router.post('/profileUpdate', authMiddleware, userController.profileUpdate); // User Profile Update
router.get('/profileDetails', authMiddleware, userController.profileDetails); // User Profile Details
router.get('/recoverVerifyEmail/:email', userController.recoverVerifyEmail); // User Recover Verify Email
router.get('/recoverVerifyOTP/:email/:otpCode', userController.recoverVerifyOTP); // User Recover Verify OTP
router.post('/resetPassword', userController.recoverResetPass); // User Reset Password


// Routes for Brands
router.post('/createBrand', authMiddleware, brandsController.createBrand); // Create Brand
router.post('/updateBrand/:id', authMiddleware, brandsController.updateBrand); // Update Brand
router.get('/brandList/:pageNo/:perPage/:searchKeyword', authMiddleware, brandsController.brandList); // List Brand
router.get('/brandDropdown', authMiddleware, brandsController.brandDropdown); // Brand Dropdown



module.exports = router;
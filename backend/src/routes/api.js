

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/user/userController');
const brandsController = require('../controllers/brands/brandsController');
const categoriesController = require('../controllers/categories/categoryController');
const customersController = require('../controllers/customers/customerController');
const suppliersController = require('../controllers/suppliers/supplierController');

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


// Routes for Categories
router.post('/createCategory', authMiddleware, categoriesController.createCategory); // Create Category
router.post('/updateCategory/:id', authMiddleware, categoriesController.updateCategory); // Update Category
router.get('/categoryList/:pageNo/:perPage/:searchKeyword', authMiddleware, categoriesController.categoryList); // List Category
router.get('/categoryDropdown', authMiddleware, categoriesController.categoryDropdown); // Category Dropdown


// Routes for Customers
router.post('/createCustomer', authMiddleware, customersController.createCustomer); // Create Customer
router.post('/updateCustomer/:id', authMiddleware, customersController.updateCustomer); // Update Customer
router.get('/customerList/:pageNo/:perPage/:searchKeyword', authMiddleware, customersController.customerList); // List Customer
router.get('/customerDropdown', authMiddleware, customersController.customerDropdown); // Customer Dropdown

// Routes for Suppliers
router.post('/createSupplier', authMiddleware, suppliersController.createSupplier); // Create Supplier
router.post('/updateSupplier/:id', authMiddleware, suppliersController.updateSupplier); // Update Supplier
router.get('/supplierList/:pageNo/:perPage/:searchKeyword', authMiddleware, suppliersController.supplierList); // List Supplier
router.get('/supplierDropdown', authMiddleware, suppliersController.supplierDropdown); // Supplier Dropdown



module.exports = router;
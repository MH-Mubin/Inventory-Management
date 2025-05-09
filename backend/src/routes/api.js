

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/user/userController');
const brandsController = require('../controllers/brands/brandsController');
const categoriesController = require('../controllers/categories/categoryController');
const customersController = require('../controllers/customers/customerController');
const suppliersController = require('../controllers/suppliers/supplierController');
const expenseTypeController = require('../controllers/expenses/expenseTypeController');
const expenseController = require('../controllers/expenses/expenseController');
const productsController = require('../controllers/products/productController');
const purchaseController = require('../controllers/purchase/purchaseController');
const salesController = require('../controllers/sales/salesController');
const returnsController = require('../controllers/returns/returnController');

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


// Routes for expense Types
router.post('/createExpenseType', authMiddleware, expenseTypeController.createExpenseType); // Create Expense
router.post('/updateExpenseType/:id', authMiddleware, expenseTypeController.updateExpenseType); // Update Expense
router.get('/expenseTypeList/:pageNo/:perPage/:searchKeyword', authMiddleware, expenseTypeController.expenseTypeList); // List Expense
router.get('/expenseTypeDropdown', authMiddleware, expenseTypeController.expenseTypeDropdown); // Expense Dropdown


// Routes for expense
router.post('/createExpense', authMiddleware, expenseController.createExpense); // Create Expense
router.post('/updateExpense/:id', authMiddleware, expenseController.updateExpense); // Update Expense
router.get('/expenseList/:pageNo/:perPage/:searchKeyword', authMiddleware, expenseController.expenseList); // List Expense
router.delete('/deleteExpense/:id', authMiddleware, expenseController.deleteExpense)


// Routes for Products
router.post('/createProduct', authMiddleware, productsController.createProduct); // Create Product
router.post('/updateProduct/:id', authMiddleware, productsController.updateProduct); // Update Product
router.get('/productList/:pageNo/:perPage/:searchKeyword', authMiddleware, productsController.productList); // List Product


// Routes for Purchase
router.post('/createPurchase', authMiddleware, purchaseController.createPurchase); // Create Purchase
router.get('/purchaseList/:pageNo/:perPage/:searchKeyword', authMiddleware, purchaseController.purchaseList); // List Purchase
router.get('/deletePurchase/:id', authMiddleware, purchaseController.purchaseDelete); // Delete Purchase



// Routes for Sales
router.post('/createSale', authMiddleware, salesController.createSale); // Create Sale
router.get('/saleList/:pageNo/:perPage/:searchKeyword', authMiddleware, salesController.saleList); // List Sale
router.get('/deleteSale/:id', authMiddleware, salesController.saleDelete); // Delete Sale


// Routes for Returns
router.post('/createReturn', authMiddleware, returnsController.createReturn); // Create Return
router.get('/returnList/:pageNo/:perPage/:searchKeyword', authMiddleware, returnsController.returnList); // List Return
router.get('/deleteReturn/:id', authMiddleware, returnsController.returnDelete); // Delete Return

module.exports = router;
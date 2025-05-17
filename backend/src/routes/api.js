

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
const reportController = require('../controllers/reports/reportController');
const summaryController = require('../controllers/summary/summaryController')


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
router.get('/userDetailById/:id', authMiddleware, userController.userDetailsById) // User Details by Id


// Routes for Brands
router.post('/createBrand', authMiddleware, brandsController.createBrand); // Create Brand
router.post('/updateBrand/:id', authMiddleware, brandsController.updateBrand); // Update Brand
router.get('/brandList/:pageNo/:perPage/:searchKeyword', authMiddleware, brandsController.brandList); // List Brand
router.get('/brandDropdown', authMiddleware, brandsController.brandDropdown); // Brand Dropdown
router.get('/brandDelete/:id', authMiddleware, brandsController.brandDelete); // Brand Delete
router.get('/brandDetailById/:id', authMiddleware, brandsController.brandDetailsById); // Brand Details by Id



// Routes for Categories
router.post('/createCategory', authMiddleware, categoriesController.createCategory); // Create Category
router.post('/updateCategory/:id', authMiddleware, categoriesController.updateCategory); // Update Category
router.get('/categoryList/:pageNo/:perPage/:searchKeyword', authMiddleware, categoriesController.categoryList); // List Category
router.get('/categoryDropdown', authMiddleware, categoriesController.categoryDropdown); // Category Dropdown
router.get('/categoryDelete/:id', authMiddleware, categoriesController.categoryDelete); // Category Delete
router.get('/categoryDetailById/:id', authMiddleware, categoriesController.categoryDetailsById); // Category Detail by Id



// Routes for Customers
router.post('/createCustomer', authMiddleware, customersController.createCustomer); // Create Customer
router.post('/updateCustomer/:id', authMiddleware, customersController.updateCustomer); // Update Customer
router.get('/customerList/:pageNo/:perPage/:searchKeyword', authMiddleware, customersController.customerList); // List Customer
router.get('/customerDropdown', authMiddleware, customersController.customerDropdown); // Customer Dropdown
router.get('/customerDelete/:id', authMiddleware, customersController.customerDelete); // Customer Delete
router.get('/customerDetailById/:id', authMiddleware, customersController.customerDetailsById); // Customer Detail by Id

// Routes for Suppliers
router.post('/createSupplier', authMiddleware, suppliersController.createSupplier); // Create Supplier
router.post('/updateSupplier/:id', authMiddleware, suppliersController.updateSupplier); // Update Supplier
router.get('/supplierList/:pageNo/:perPage/:searchKeyword', authMiddleware, suppliersController.supplierList); // List Supplier
router.get('/supplierDropdown', authMiddleware, suppliersController.supplierDropdown); // Supplier Dropdown
router.get('/supplierDelete/:id', authMiddleware, suppliersController.supplierDelete); // Supplier Delete
router.get('/supplierDetailById/:id', authMiddleware, suppliersController.supplierDetailsById); // Supplier Detail by Id


// Routes for expense Types
router.post('/createExpenseType', authMiddleware, expenseTypeController.createExpenseType); // Create Expense Type
router.post('/updateExpenseType/:id', authMiddleware, expenseTypeController.updateExpenseType); // Update Expense Type
router.get('/expenseTypeList/:pageNo/:perPage/:searchKeyword', authMiddleware, expenseTypeController.expenseTypeList); // Expense Type List 
router.get('/expenseTypeDropdown', authMiddleware, expenseTypeController.expenseTypeDropdown); // Expense Type Dropdown
router.get('/expenseTypeDetailById/:id', authMiddleware, expenseTypeController.expenseTypeDetailsById); // Expense Type Details by Id


// Routes for expense
router.post('/createExpense', authMiddleware, expenseController.createExpense); // Create Expense
router.post('/updateExpense/:id', authMiddleware, expenseController.updateExpense); // Update Expense
router.get('/expenseList/:pageNo/:perPage/:searchKeyword', authMiddleware, expenseController.expenseList); // List Expense
router.get('/deleteExpense/:id', authMiddleware, expenseController.deleteExpense) // Delete Expense
router.get('/expenseDetailById/:id', authMiddleware, expenseController.expenseDetailsById) // Expense Details By Id


// Routes for Products
router.post('/createProduct', authMiddleware, productsController.createProduct); // Create Product
router.post('/updateProduct/:id', authMiddleware, productsController.updateProduct); // Update Product
router.get('/productList/:pageNo/:perPage/:searchKeyword', authMiddleware, productsController.productList); // List Product
router.get('/deleteProduct/:id', authMiddleware, productsController.productDelete); // Delete Product
router.get('/productDetailById/:id', authMiddleware, productsController.productDetailsById); // Product Details by Id

// Routes for Purchase
router.post('/createPurchase', authMiddleware, purchaseController.createPurchase); // Create Purchase
router.get('/purchaseList/:pageNo/:perPage/:searchKeyword', authMiddleware, purchaseController.purchaseList); // List Purchase
router.get('/deletePurchase/:id', authMiddleware, purchaseController.purchaseDelete); // Delete Purchase
router.get('/purchaseDetailById/:id', authMiddleware, purchaseController.purchaseDetailsById); // Purchase Details By Id



// Routes for Sales
router.post('/createSale', authMiddleware, salesController.createSale); // Create Sale
router.get('/saleList/:pageNo/:perPage/:searchKeyword', authMiddleware, salesController.saleList); // List Sale
router.get('/deleteSale/:id', authMiddleware, salesController.saleDelete); // Delete Sale
router.get('/saleDetailById/:id', authMiddleware, salesController.saleDetailsById); // Sale Details By Id


// Routes for Returns
router.post('/createReturn', authMiddleware, returnsController.createReturn); // Create Return
router.get('/returnList/:pageNo/:perPage/:searchKeyword', authMiddleware, returnsController.returnList); // List Return
router.get('/deleteReturn/:id', authMiddleware, returnsController.returnDelete); // Delete Return
router.get('/returnDetailById/:id', authMiddleware, returnsController.returnDetailsById); // Return Details By Id


// Routes for reports
router.post('/expenseReport',authMiddleware, reportController.expenseReport); // Expense Report
router.post('/purchaseReport',authMiddleware, reportController.purchaseReport); // Purchase Report
router.post('/returnReport',authMiddleware, reportController.returnReport); // Return Report
router.post('/salesReport',authMiddleware, reportController.salesReport); // Sales Report


// Routes for summary
router.post('/expenseSummary',authMiddleware, summaryController.expenseSummary); // Expense Summary
router.post('/purchaseSummary',authMiddleware, summaryController.purchaseSummary); // Purchase Summary
router.post('/returnSummary',authMiddleware, summaryController.returnSummary); // Return Summary
router.post('/saleSummary',authMiddleware, summaryController.saleSummary); // Sale Summary




module.exports = router;
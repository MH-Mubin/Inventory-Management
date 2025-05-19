Inventory Management System
Overview
Streamline your business with real-time inventory and sales tracking.This Inventory Management System backend is a secure and scalable solution for businesses to manage daily operations efficiently. It handles product inventory, sales, purchases, returns, suppliers, customers, and expenses, providing comprehensive reports and summaries to support data-driven decisions with clarity and precision. Note: This is the backend part of the project; the frontend will be developed later.
Features

Inventory Management: Track and manage product stock levels.
Sales & Purchases: Record and process sales and purchase transactions.
Returns Handling: Manage product returns with parent-child data integrity.
Suppliers & Customers: Maintain supplier and customer records.
Expenses Tracking: Monitor expenses and categorize expense types.
Reports & Summaries: Generate detailed reports and summaries for sales, purchases, returns, and expenses.
User Authentication: Secure login with JWT, email verification, and password hashing.
Security: Protection against XSS, NoSQL injection, and brute-force attacks.

Tech Stack

Technology
Version
Description

Node.js
20.12.2
JavaScript runtime for server-side execution

Express.js
5.1.0
Web framework for building RESTful APIs

## MongoDB

NoSQL database for structured business data

Mongoose
8.13.3
ODM for MongoDB, handling schemas, queries, and validations

JWT (jsonwebtoken)
9.0.2
User authentication and route protection

bcrypt
5.1.1
Password hashing for secure authentication

Nodemailer
6.10.1
Email service for verification and password reset

dotenv
16.5.0
Loads environment variables from .env file

cors
2.8.5
Enables Cross-Origin Resource Sharing

helmet
8.1.0
Sets HTTP headers for enhanced security

hpp
0.2.3
Prevents HTTP parameter pollution

xss-clean
0.1.4
Sanitizes inputs to prevent XSS attacks

express-rate-limit
7.5.0
Limits requests to prevent abuse

express-mongo-sanitize
2.2.0
Prevents NoSQL injection attacks

body-parser
2.2.0
Parses incoming request bodies

faker-js
9.7.0
Generates fake data for seeding

nodemon
3.1.10
Auto-restarts server during development

## Postman

Tool for API testing and documentation

## MongoDB Compass

GUI for MongoDB database management

## VS Code

IDE for coding and debugging

Project Folder Structure
backend
├── README.md
├── app.js
├── index.js
├── package-lock.json
├── package.json
├── playground-1.mongodb.js
├── seeder
│ └── seedData.js
└── src
├── controllers
│ ├── brands
│ │ └── brandsController.js
│ ├── categories
│ │ └── categoryController.js
│ ├── customers
│ │ └── customerController.js
│ ├── expenses
│ │ ├── expenseController.js
│ │ └── expenseTypeController.js
│ ├── products
│ │ └── productController.js
│ ├── purchase
│ │ └── purchaseController.js
│ ├── reports
│ │ └── reportController.js
│ ├── returns
│ │ └── returnController.js
│ ├── sales
│ │ └── salesController.js
│ ├── summary
│ │ └── summaryController.js
│ ├── suppliers
│ │ └── supplierController.js
│ └── user
│ └── userController.js
├── middlewares
│ └── authMiddleware.js
├── models
│ ├── Products
│ │ └── productModel.js
│ ├── brands
│ │ └── brandsModel.js
│ ├── categories
│ │ └── categoryModel.js
│ ├── customers
│ │ └── customerModel.js
│ ├── expenses
│ │ ├── expenseModel.js
│ │ └── expenseTypeModel.js
│ ├── purchase
│ │ ├── purchaseModel.js
│ │ └── purhaseProductsModel.js
│ ├── returns
│ │ ├── returnModel.js
│ │ └── returnProductsModel.js
│ ├── sales
│ │ ├── saleModel.js
│ │ └── saleProductsModel.js
│ ├── suppliers
│ │ └── supplierModel.js
│ └── users
│ ├── otpModel.js
│ └── userModel.js
├── routes
│ └── api.js
├── services
│ ├── common
│ │ ├── checkAssociateService.js
│ │ ├── createParentChildService.js
│ │ ├── createService.js
│ │ ├── deleteParentChildService.js
│ │ ├── deleteService.js
│ │ ├── detailsByIdService.js
│ │ ├── dropDownService.js
│ │ ├── listOneJoinService.js
│ │ ├── listService.js
│ │ ├── listTwoJoinService.js
│ │ └── updateService.js
│ ├── reports
│ │ ├── expenseReportService.js
│ │ ├── purchaseReportService.js
│ │ ├── returnReportService.js
│ │ └── saleReportService.js
│ ├── summary
│ │ ├── expenseSummaryService.js
│ │ ├── purchaseSummaryService.js
│ │ ├── returnSummaryService.js
│ │ └── saleSummaryService.js
│ └── user
│ ├── userCreateService.js
│ ├── userDetailsService.js
│ ├── userLoginService.js
│ ├── userResetpassService.js
│ ├── userUpdateService.js
│ ├── userVerifyEmailService.js
│ └── userVerifyOTPService.js
└── utility
├── createToken.js
└── sendEmailUtility.js

Key Design Highlights

Reusable Services: Functions like createService, deleteService, and listTwoJoinService in the common folder follow the DRY principle for consistent logic across modules.
Transaction & Rollback: Implemented in createParentChildService and deleteParentChildService using MongoDB transactions for data integrity.
Security: Utilizes helmet, xss-clean, express-mongo-sanitize, hpp, and express-rate-limit to protect against XSS, NoSQL injection, and brute-force attacks.
Environment Variables: Sensitive credentials are stored in a .env file, loaded via dotenv.

Installation
Prerequisites

Node.js (v20.12.2): Required to run the server.
MongoDB: A local MongoDB instance or a cloud-based service like MongoDB Atlas for the database.
npm: Included with Node.js for package management.
Postman: Recommended for manual API testing.
MongoDB Compass (optional): For database visualization and management.
Git: For cloning the repository.

Setup

Clone the repository:git clone https://github.com/MH-Mubin/Inventory-Management.git

Navigate to the project directory:cd Inventory-Management/backend

Install dependencies:npm install

Create a .env file based on the provided example:PORT=5050
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_email_smtp
EMAIL_PORT=your_email_smtp_port
EMAIL_USER=your_email
EMAIL_PASS=your_password

Start the development server:npm start

Usage

The server runs at http://localhost:5050.
Access API endpoints via /api/v1/ (e.g., /api/v1/products, /api/v1/sales).
Use Postman to test endpoints with the provided Postman Collection. Some routes require JWT tokens.
Refer to the API documentation (if available) for detailed endpoint information.

API Endpoints
All routes are registered in src/routes/api.js. Below are key endpoints:

Endpoint
Method
Description
Auth Required

/api/v1/registration
POST
Register a new user
No

/api/v1/login
POST
Authenticate a user
No

/api/v1/profileUpdate
POST
Update user profile
Yes

/api/v1/products/createProduct
POST
Create a new product
Yes

/api/v1/products/productList/:pageNo/:perPage/:searchKeyword
GET
List products with pagination
Yes

/api/v1/sales/createSale
POST
Create a new sale
Yes

/api/v1/purchase/createPurchase
POST
Create a new purchase
Yes

/api/v1/returns/createReturn
POST
Create a new return
Yes

/api/v1/reports/salesReport
POST
Generate sales report
Yes

/api/v1/summary/expenseSummary
POST
Generate expense summary
Yes

Authentication

JWT-based: Uses jsonwebtoken for secure authentication, with tokens expiring after 24 hours (requires re-login).
Password Hashing: Implemented with bcrypt.
Protected Routes: Secured via authMiddleware.js.
Email Verification: Handled using Nodemailer for verification and password resets. OTP validity is not time-limited for testing purposes.

Seeder
To populate initial dummy data:
node seeder/seedData.js

This uses faker.js to insert documents into MongoDB collections.
Testing

Testing is performed manually using Postman with the provided Postman Collection.
Use MongoDB Compass for database inspection.

Deployment

The project has not been deployed yet. For future deployment, consider platforms like Heroku, AWS, or DigitalOcean, with MongoDB hosted on MongoDB Atlas and a process manager like PM2 for production.

Contributing

Fork the repository.
Create a feature branch:git checkout -b feature-name

Commit changes:git commit -m "Add feature"

Push to the branch:git push origin feature-name

Submit a pull request.

License
MIT License
Contact
For issues or inquiries, reach out via GitHub or email at [your-email@example.com].
Tools Used

VS Code: IDE for coding and debugging.
Postman: For API testing and documentation.
MongoDB Compass: For MongoDB database management.

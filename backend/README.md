🧾 Inventory Management System – Backend
🚀 Project Overview
This Inventory Management System backend is a secure and scalable solution for businesses to manage their daily operations efficiently. Users can handle product inventory, sales, purchases, returns, suppliers, customers, and expenses. The system also provides comprehensive reports and summaries to help businesses make data-driven decisions with clarity and precision.

🧠 Problem Solving with Technology
Problem Technology Used Purpose
Authentication & Authorization jsonwebtoken, bcrypt Secures user login and access control
Data Modeling mongoose Efficient MongoDB schema modeling
Email & OTP Verification nodemailer Sends verification and password reset emails
Request Parsing body-parser, express Processes JSON and URL-encoded data
Input & Query Sanitization xss-clean, express-mongo-sanitize, hpp Protects against XSS and injection attacks
Security Headers helmet Secures HTTP headers
Rate Limiting express-rate-limit Prevents brute-force API abuse
Environment Variables dotenv Manages secrets securely
CORS Handling cors Enables cross-origin resource sharing

♻️ Reusable Services (/services/common)
To promote reusability and reduce code duplication, several generic service functions were developed and are used across multiple controllers:

createService.js

deleteService.js

listService.js

listTwoJoinService.js

listOneJoinService.js

dropDownService.js

detailsByIdService.js

checkAssociateService.js

updateService.js

createParentChildService.js

deleteParentChildService.js

These services handle common tasks like CRUD operations, relationship handling, and efficient data querying using aggregation pipelines.

🔁 Transaction Rollback Support
The backend implements MongoDB transactions via Mongoose sessions for complex operations to ensure data consistency. For example:

createParentChildService.js – Handles creation of related documents atomically (e.g., purchase and purchaseProducts).

deleteParentChildService.js – Ensures all related data is deleted consistently or rolled back on failure.

🔐 Security Middleware
helmet – Secures HTTP headers.

xss-clean – Protects against cross-site scripting attacks.

express-mongo-sanitize – Prevents NoSQL injection.

hpp – Guards against HTTP parameter pollution.

express-rate-limit – Limits repeated requests to public APIs.

cors – Enables secure cross-origin requests.

🧪 Tools Used
Postman – For testing REST APIs.

MongoDB Compass – GUI for MongoDB data visualization and management.

Nodemon – Auto-restarts server during development.

Dotenv – Loads environment variables from .env.

📦 Tech Stack (Dependencies)
json
Copy
Edit
"bcrypt": "^5.1.1",
"body-parser": "^2.2.0",
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^5.1.0",
"express-mongo-sanitize": "^2.2.0",
"express-rate-limit": "^7.5.0",
"helmet": "^8.1.0",
"hpp": "^0.2.3",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.13.3",
"nodemailer": "^6.10.1",
"nodemon": "^3.1.10",
"xss-clean": "^0.1.4"
⚙️ Run the Project
To start the development server, run:

bash
Copy
Edit
npm start
json
Copy
Edit
"scripts": {
"start": "nodemon index.js",
"test": "echo \"Error: no test specified\" && exit 1"
}
📁 Full Folder Structure
pgsql
Copy
Edit
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

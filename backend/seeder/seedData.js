
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

// import models
const brands = require('../src/models/brands/brandsModel');
const categories = require('../src/models/categories/categoryModel');
const customers = require('../src/models/customers/customerModel');
const expenses = require('../src/models/expenses/expenseModel');
const expenseTypes = require('../src/models/expenses/expenseTypeModel');
const products = require('../src/models/Products/productModel');
const purchase = require('../src/models/purchase/purchaseModel');
const purchaseProducts = require('../src/models/purchase/purhaseProductsModel');
const returns = require('../src/models/returns/returnModel');
const returnProducts = require('../src/models/returns/returnProductsModel');
const sales = require('../src/models/sales/saleModel');
const saleProducts = require('../src/models/sales/saleProductsModel');
const suppliers = require('../src/models/suppliers/supplierModel');
const users = require('../src/models/users/userModel');


mongoose.connect('mongodb+srv://mubin:mubin007@cluster0.ptjpk9z.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedDatabase = async () => {
    await brands.deleteMany();
    await categories.deleteMany();
    await customers.deleteMany();
    await expenses.deleteMany();
    await expenseTypes.deleteMany();
    await products.deleteMany();
    await purchase.deleteMany();
    await purchaseProducts.deleteMany();
    await returns.deleteMany();
    await returnProducts.deleteMany();
    await sales.deleteMany();
    await saleProducts.deleteMany();
    await suppliers.deleteMany();
    await users.deleteMany();


  // 1️⃣ Insert Products
  let products = [];
  for (let i = 0; i < 10; i++) {
    const product = await Product.create({
      name: faker.commerce.productName(),
      unit: 'pcs',
      details: faker.commerce.productDescription(),
      brandId: new mongoose.Types.ObjectId(),
      categoryId: new mongoose.Types.ObjectId(),
      userEmail: 'test@example.com'
    });
    products.push(product);
  }

  // 2️⃣ Insert Customers
  let customers = [];
  for (let i = 0; i < 5; i++) {
    const customer = await customer.create({
      name: faker.name.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      userEmail: 'test@example.com'
    });
    customers.push(customer);
  }

  // 3️⃣ Insert Suppliers
  let suppliers = [];
  for (let i = 0; i < 5; i++) {
    const supplier = await Supplier.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      userEmail: 'test@example.com'
    });
    suppliers.push(supplier);
  }

  // 4️⃣ Insert Purchases (parent + child simulation)
  for (let i = 0; i < 5; i++) {
    await Purchase.create({
      supplierId: suppliers[i % suppliers.length]._id,
      vatTax: 10,
      discount: 5,
      grandTotal: 1000,
      userEmail: 'test@example.com',
      note: faker.lorem.sentence()
    });
  }

  // 5️⃣ Insert Sales
  for (let i = 0; i < 5; i++) {
    await Sale.create({
      customerId: customers[i % customers.length]._id,
      vatTax: 12,
      discount: 8,
      grandTotal: 800,
      userEmail: 'test@example.com',
      note: faker.lorem.sentence()
    });
  }

  console.log("✅ Database seeded successfully!");
  mongoose.connection.close();
};

seedDatabase();

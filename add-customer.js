require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./config/db').promise();

async function addCustomer() {
  try {

    console.log('Connecting to database...');

    // Customer details
    const name = 'Customer';
    const email = 'customer@sweetbake.com';
    const password = 'customer123';
    const role = 'customer';

    // Check if email already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    const [existingUser] = await db.query(checkQuery, [email]);

    if (existingUser.length > 0) {
      console.log('Customer already exists!');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert customer
    const insertQuery = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(insertQuery, [
      name,
      email,
      hashedPassword,
      role
    ]);

    console.log('=================================');
    console.log('Customer account created!');
    console.log(`ID: ${result.insertId}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('=================================');

  } catch (err) {

    console.error('Error adding customer:');
    console.error(err);

  } finally {

    // Close database connection
    await db.end();
    console.log('Database connection closed.');

  }
}

// Run function
addCustomer();

require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./config/db').promise();

async function addCustomer() {
  try {
    const hashedPassword = await bcrypt.hash('customer123', 10);
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, ['Customer', 'customer@sweetbake.com', hashedPassword, 'customer']);
    console.log(`Customer inserted with ID: ${result.insertId}`);
  } catch (err) {
    console.error('Error adding customer:', err);
  } finally {
    await db.end();
  }
}

addCustomer();

require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./config/db').promise();

async function seed() {
  try {
    const users = [
      {
        name: 'Admin',
        email: 'admin@sweetbake.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        name: 'Staff',
        email: 'staff@sweetbake.com',
        password: 'staff123',
        role: 'staff'
      },
      {
        name: 'Customer',
        email: 'customer@sweetbake.com',
        password: 'customer123',
        role: 'customer'
      }
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
      const [result] = await db.query(query, [user.name, user.email, hashedPassword, user.role]);
      console.log(`User ${user.email} inserted with ID: ${result.insertId}`);
    }

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await db.end();
  }
}

seed();

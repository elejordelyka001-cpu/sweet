require('dotenv').config();
const db = require('./config/db').promise();

async function addSampleOrders() {
  try {
    // Add sample products if none exist
    const [products] = await db.query('SELECT * FROM products');
    let productId;
    if (products.length === 0) {
      const [result] = await db.query('INSERT INTO products (cake_name, description, price) VALUES (?, ?, ?)', [
        'Chocolate Cake',
        'Delicious chocolate cake',
        500
      ]);
      productId = result.insertId;
    } else {
      productId = products[0].id;
    }

    // Get customer ID
    const [customers] = await db.query('SELECT id FROM users WHERE role = ?', ['customer']);
    let customerId;
    if (customers.length === 0) {
      const [custResult] = await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
        'Test Customer',
        'testcustomer@sweetbake.com',
        '$2b$10$GI1awEESPuHsQwDkQe5IoewVFJYFpw8vVs8atnXjgEHn08OHKwVVS',
        'customer'
      ]);
      customerId = custResult.insertId;
    } else {
      customerId = customers[0].id;
    }

    // Add sample delivered orders
    const orders = [
      { total: 500, date: '2026-05-20', status: 'Delivered' },
      { total: 1000, date: '2026-05-22', status: 'Delivered' },
      { total: 750, date: '2026-05-25', status: 'Delivered' },
      { total: 1500, date: '2026-05-27', status: 'Delivered' },
      { total: 2500, date: '2026-05-28', status: 'Delivered' }
    ];

    for (const order of orders) {
      const [orderResult] = await db.query('INSERT INTO orders (customer_id, total_amount, status, created_at) VALUES (?, ?, ?, ?)', [
        customerId,
        order.total,
        order.status,
        order.date
      ]);
      
      // Add order item
      await db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [
        orderResult.insertId,
        productId,
        Math.ceil(order.total / 500),
        500
      ]);
      console.log(`Added sample order with total: ₱${order.total}`);
    }

    // Add sample inventory
    const [inventoryCheck] = await db.query('SELECT * FROM inventory');
    if (inventoryCheck.length === 0) {
      const inventoryItems = [
        ['Flour', 50],
        ['Sugar', 30],
        ['Eggs', 100],
        ['Butter', 20]
      ];
      for (const item of inventoryItems) {
        await db.query('INSERT INTO inventory (ingredient_name, quantity) VALUES (?, ?)', item);
      }
      console.log('Added sample inventory');
    }

    console.log('Sample orders added successfully!');
  } catch (err) {
    console.error('Error adding sample orders:', err);
  } finally {
    await db.end();
  }
}

addSampleOrders();

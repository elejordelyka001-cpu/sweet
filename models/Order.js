const db = require('../config/db');

class Order {
  static create(orderData, callback) {
    const query = 'INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)';
    db.query(query, [orderData.customer_id, orderData.total_amount, orderData.status || 'Pending'], callback);
  }

  static findAll(callback) {
    const query = 'SELECT o.*, u.name as customer_name FROM orders o JOIN users u ON o.customer_id = u.id ORDER BY o.id ASC';
    db.query(query, callback);
  }

  static findByCustomerId(customerId, callback) {
    const query = 'SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC';
    db.query(query, [customerId], callback);
  }

  static findById(id, callback) {
    const query = 'SELECT o.*, u.name as customer_name FROM orders o JOIN users u ON o.customer_id = u.id WHERE o.id = ?';
    db.query(query, [id], callback);
  }

  static updateStatus(id, status, callback) {
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(query, [status, id], callback);
  }

  static addOrderItem(itemData, callback) {
    const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    db.query(query, [itemData.order_id, itemData.product_id, itemData.quantity, itemData.price], callback);
  }

  static getOrderItems(orderId, callback) {
    const query = 'SELECT oi.*, p.cake_name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?';
    db.query(query, [orderId], callback);
  }
}

module.exports = Order;

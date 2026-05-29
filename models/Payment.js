const db = require('../config/db');

class Payment {
  static create(paymentData, callback) {
    const query = 'INSERT INTO payments (order_id, payment_method, payment_status, proof_image) VALUES (?, ?, ?, ?)';
    db.query(query, [paymentData.order_id, paymentData.payment_method, paymentData.payment_status || 'Pending', paymentData.proof_image], callback);
  }

  static findAll(callback) {
    const query = 'SELECT p.*, o.total_amount FROM payments p JOIN orders o ON p.order_id = o.id';
    db.query(query, callback);
  }

  static findByOrderId(orderId, callback) {
    const query = 'SELECT * FROM payments WHERE order_id = ?';
    db.query(query, [orderId], callback);
  }

  static updateStatus(id, status, callback) {
    const query = 'UPDATE payments SET payment_status = ? WHERE id = ?';
    db.query(query, [status, id], callback);
  }
}

module.exports = Payment;

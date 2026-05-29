const db = require('../config/db');

class User {
  static create(userData, callback) {
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [userData.name, userData.email, userData.password, userData.role], callback);
  }

  static findByEmail(email, callback) {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], callback);
  }

  static findAll(callback) {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = User;

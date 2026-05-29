const db = require('../config/db');

class Product {
  static create(productData, callback) {
    const query = 'INSERT INTO products (cake_name, description, price, image) VALUES (?, ?, ?, ?)';
    db.query(query, [productData.cake_name, productData.description, productData.price, productData.image], callback);
  }

  static findAll(callback) {
    const query = 'SELECT * FROM products';
    db.query(query, callback);
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM products WHERE id = ?';
    db.query(query, [id], callback);
  }

  static update(id, productData, callback) {
    const query = 'UPDATE products SET cake_name = ?, description = ?, price = ?, image = ? WHERE id = ?';
    db.query(query, [productData.cake_name, productData.description, productData.price, productData.image, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Product;

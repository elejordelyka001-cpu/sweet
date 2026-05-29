const db = require('../config/db');

class Inventory {
  static create(inventoryData, callback) {
    const query = 'INSERT INTO inventory (ingredient_name, quantity) VALUES (?, ?)';
    db.query(query, [inventoryData.ingredient_name, inventoryData.quantity], callback);
  }

  static findAll(callback) {
    const query = 'SELECT * FROM inventory';
    db.query(query, callback);
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM inventory WHERE id = ?';
    db.query(query, [id], callback);
  }

  static update(id, inventoryData, callback) {
    const query = 'UPDATE inventory SET ingredient_name = ?, quantity = ? WHERE id = ?';
    db.query(query, [inventoryData.ingredient_name, inventoryData.quantity, id], callback);
  }

  static delete(id, callback) {
    const query = 'DELETE FROM inventory WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Inventory;

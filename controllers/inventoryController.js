const Inventory = require('../models/Inventory');

exports.getInventory = (req, res) => {
  Inventory.findAll((err, inventory) => {
    if (err) {
      return res.status(500).send('Error fetching inventory');
    }
    res.render('inventory', { inventory, user: req.session.user });
  });
};

exports.getAddInventory = (req, res) => {
  res.render('addInventory', { user: req.session.user });
};

exports.postAddInventory = (req, res) => {
  const { ingredient_name, quantity } = req.body;
  Inventory.create({ ingredient_name, quantity }, (err) => {
    if (err) {
      return res.status(500).send('Error adding inventory');
    }
    res.redirect('/admin/inventory');
  });
};

exports.getEditInventory = (req, res) => {
  Inventory.findById(req.params.id, (err, inventory) => {
    if (err || inventory.length === 0) {
      return res.status(500).send('Error fetching inventory item');
    }
    res.render('editInventory', { item: inventory[0], user: req.session.user });
  });
};

exports.postEditInventory = (req, res) => {
  const { ingredient_name, quantity } = req.body;
  Inventory.update(req.params.id, { ingredient_name, quantity }, (err) => {
    if (err) {
      return res.status(500).send('Error updating inventory');
    }
    res.redirect('/admin/inventory');
  });
};

exports.deleteInventory = (req, res) => {
  Inventory.delete(req.params.id, (err) => {
    if (err) {
      return res.status(500).send('Error deleting inventory item');
    }
    res.redirect('/admin/inventory');
  });
};

const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { isAdmin, isStaff } = require('../middleware/authMiddleware');

router.get('/admin/inventory', isAdmin, inventoryController.getInventory);
router.get('/staff/inventory', isStaff, inventoryController.getInventory);
router.get('/admin/inventory/add', isAdmin, inventoryController.getAddInventory);
router.post('/admin/inventory/add', isAdmin, inventoryController.postAddInventory);
router.get('/admin/inventory/edit/:id', isAdmin, inventoryController.getEditInventory);
router.post('/admin/inventory/edit/:id', isAdmin, inventoryController.postEditInventory);
router.get('/admin/inventory/delete/:id', isAdmin, inventoryController.deleteInventory);

module.exports = router;

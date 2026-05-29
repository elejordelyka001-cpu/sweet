const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAdmin } = require('../middleware/authMiddleware');

router.get('/admin/products', isAdmin, productController.getProducts);
router.get('/admin/products/add', isAdmin, productController.getAddProduct);
router.post('/admin/products/add', isAdmin, productController.postAddProduct);
router.get('/admin/products/edit/:id', isAdmin, productController.getEditProduct);
router.post('/admin/products/edit/:id', isAdmin, productController.postEditProduct);
router.get('/admin/products/delete/:id', isAdmin, productController.deleteProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAdmin, isStaff, isCustomer } = require('../middleware/authMiddleware');

router.get('/admin/orders', isAdmin, orderController.getOrders);
router.get('/admin/orders/add', isAdmin, orderController.getAddOrder);
router.post('/admin/orders/add', isAdmin, orderController.postAddOrder);
router.get('/staff/orders', isStaff, orderController.getOrders);
router.get('/staff/orders/add', isStaff, orderController.getAddOrder);
router.post('/staff/orders/add', isStaff, orderController.postAddOrder);
router.post('/staff/orders/:id/status', isStaff, orderController.updateOrderStatus);
router.get('/orders/:id', (req, res, next) => {
  if (req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'staff' || req.session.user.role === 'customer')) {
    next();
  } else {
    res.redirect('/login');
  }
}, orderController.getOrderDetail);

router.get('/customer/orders', isCustomer, orderController.getCustomerOrders);
router.get('/customer/orders/:id', isCustomer, orderController.getOrderDetail);
router.get('/customer/checkout', isCustomer, orderController.getCheckout);
router.post('/customer/checkout', isCustomer, orderController.postCheckout);
router.post('/customer/cart/add', isCustomer, orderController.addToCart);

module.exports = router;

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { isAdmin, isStaff, isCustomer } = require('../middleware/authMiddleware');

router.get('/admin/payments', isAdmin, paymentController.getPayments);
router.get('/staff/payments', isStaff, paymentController.getPayments);
router.post('/staff/payments/:id/confirm', isStaff, paymentController.confirmPayment);
router.post('/customer/payments/proof', isCustomer, paymentController.uploadPaymentProof);

module.exports = router;

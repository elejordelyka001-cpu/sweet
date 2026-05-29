const Payment = require('../models/Payment');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.getPayments = (req, res) => {
  Payment.findAll((err, payments) => {
    if (err) {
      return res.status(500).send('Error fetching payments');
    }
    res.render('payments', { payments, user: req.session.user });
  });
};

exports.confirmPayment = (req, res) => {
  Payment.updateStatus(req.params.id, 'Confirmed', (err) => {
    if (err) {
      return res.status(500).send('Error confirming payment');
    }
    res.redirect('/staff/payments');
  });
};

exports.uploadPaymentProof = [upload.single('proof_image'), (req, res) => {
  const { order_id } = req.body;
  const proof_image = req.file ? req.file.filename : null;
  
  Payment.findByOrderId(order_id, (err, payments) => {
    if (err) {
      return res.status(500).send('Error finding payment');
    }
    if (payments.length > 0) {
      const paymentId = payments[0].id;
      const db = require('../config/db');
      const query = 'UPDATE payments SET proof_image = ? WHERE id = ?';
      db.query(query, [proof_image, paymentId], (err) => {
        if (err) {
          return res.status(500).send('Error updating payment proof');
        }
        res.redirect('/customer/orders');
      });
    } else {
      res.redirect('/customer/orders');
    }
  });
}];

const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const { isAdmin, isStaff } = require('../middleware/authMiddleware');

router.get('/admin/reports', isAdmin, reportsController.getReports);
router.get('/staff/reports', isStaff, reportsController.getReports);

module.exports = router;

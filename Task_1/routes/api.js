const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/health', apiController.healthCheck);

// Protected routes (requires authentication)
router.get('/users', protect, apiController.getUsers);
router.post('/users', protect, apiController.createUser);

// Admin only routes
router.get('/admin/dashboard', protect, authorize('admin'), apiController.adminDashboard);

// Moderator and Admin routes
router.get('/moderator/reports', protect, authorize('moderator', 'admin'), apiController.getReports);

module.exports = router;

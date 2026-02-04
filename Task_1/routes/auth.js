const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getMe,
  getAllUsers
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

// Admin only routes
router.get('/users', protect, authorize('admin'), getAllUsers);

module.exports = router;

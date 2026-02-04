const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createTask,
  getAllTasks,
  getTaskById,
  getMyTasks,
  updateTask,
  deleteTask,
  getTaskStatistics,
  updateTaskStatus
} = require('../controllers/taskController');

// Public routes
// None

// Admin only routes - Specific routes pehle
router.get('/stats/overview', protect, authorize('admin'), getTaskStatistics);
router.post('/', protect, authorize('admin'), createTask);
router.get('/', protect, authorize('admin'), getAllTasks);

// Protected routes - All authenticated users - Dynamic routes last mein
router.get('/my-tasks', protect, getMyTasks);
router.get('/:id', protect, getTaskById);
router.put('/:id', protect, authorize('admin'), updateTask);
router.patch('/:id/status', protect, updateTaskStatus);
router.delete('/:id', protect, authorize('admin'), deleteTask);

module.exports = router;

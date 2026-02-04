const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Admin
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, priority, dueDate } = req.body;

    // Validate required fields
    if (!title || !assignedTo) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title and assignedTo'
      });
    }

    // Verify assigned user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(404).json({
        success: false,
        error: 'Assigned user not found'
      });
    }

    const taskData = {
      title,
      description,
      assignedTo,
      assignedBy: req.user.id,
      status,
      priority,
      dueDate
    };

    const task = await Task.create(taskData);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Admin
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.getById(req.params.id);

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get tasks assigned to current user
// @route   GET /api/tasks/my-tasks
// @access  Private
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.getByUserId(req.user.id);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Admin or assigned user (for status only)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.getById(req.params.id);

    // Check permissions
    if (req.user.role !== 'admin' && task.assignedTo !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this task'
      });
    }

    // Regular users can only update status
    let updateData = req.body;
    if (req.user.role !== 'admin') {
      updateData = { status: req.body.status };
    }

    const updatedTask = await Task.update(req.params.id, updateData);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Admin
exports.deleteTask = async (req, res) => {
  try {
    await Task.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats/overview
// @access  Admin
exports.getTaskStatistics = async (req, res) => {
  try {
    const stats = await Task.getStatistics();

    res.status(200).json({
      success: true,
      statistics: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id/status
// @access  Private (assigned user or admin)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.getById(req.params.id);

    // Check permissions
    if (req.user.role !== 'admin' && task.assignedTo !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this task'
      });
    }

    const updatedTask = await Task.update(req.params.id, { status });

    res.status(200).json({
      success: true,
      message: 'Task status updated successfully',
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

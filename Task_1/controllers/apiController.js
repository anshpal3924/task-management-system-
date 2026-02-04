// Health check endpoint
exports.healthCheck = (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
};

// Get all users (example) - Protected route
exports.getUsers = (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  res.json({ 
    success: true, 
    data: users,
    requestedBy: req.user.name
  });
};

// Create a new user (example) - Protected route
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name and email are required' 
    });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email,
    createdBy: req.user.name
  };
  
  res.status(201).json({ 
    success: true, 
    message: 'User created successfully',
    data: newUser 
  });
};

// Admin dashboard - Admin only
exports.adminDashboard = (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Admin Dashboard',
    admin: req.user.name,
    stats: {
      totalUsers: 150,
      activeUsers: 120,
      pendingRequests: 15
    }
  });
};

// Get reports - Moderator and Admin only
exports.getReports = (req, res) => {
  res.json({
    success: true,
    message: 'Reports data',
    accessedBy: req.user,
    reports: [
      { id: 1, type: 'User Report', status: 'pending' },
      { id: 2, type: 'Content Report', status: 'resolved' }
    ]
  });
};

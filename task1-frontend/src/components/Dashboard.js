import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const response = await taskAPI.getMyTasks();
      setMyTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskAPI.updateTaskStatus(taskId, newStatus);
      fetchMyTasks(); // Refresh tasks
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const taskStats = {
    pending: myTasks.filter(t => t.status === 'pending').length,
    inProgress: myTasks.filter(t => t.status === 'in-progress').length,
    completed: myTasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <p>You are logged in as <strong>{user.role}</strong></p>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>🔐 Your Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>User ID:</strong> {user.id}</p>
        </div>

        <div className="card">
          <h3>📋 My Tasks</h3>
          <p><strong>Total:</strong> {myTasks.length}</p>
          <p><strong>Pending:</strong> {taskStats.pending}</p>
          <p><strong>In Progress:</strong> {taskStats.inProgress}</p>
          <p><strong>Completed:</strong> {taskStats.completed}</p>
        </div>

        <div className="card">
          <h3>🧪 API Testing</h3>
          <p>Test various API endpoints with your authentication token.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/api-test')}
          >
            Go to API Test
          </button>
        </div>

        {user.role === 'admin' && (
          <div className="card">
            <h3>👑 Admin Panel</h3>
            <p>Manage users and access admin-only features.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/admin')}
            >
              Open Admin Panel
            </button>
          </div>
        )}

        {(user.role === 'moderator' || user.role === 'admin') && (
          <div className="card">
            <h3>🛡️ Moderator Panel</h3>
            <p>View reports and moderate content.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/moderator')}
            >
              Open Moderator Panel
            </button>
          </div>
        )}

        <div className="card">
          <h3>📚 Features</h3>
          <p>✅ JWT Authentication</p>
          <p>✅ Role-Based Access Control</p>
          <p>✅ Protected Routes</p>
          <p>✅ Firebase Integration</p>
        </div>
      </div>

      {/* My Tasks Section */}
      <div className="my-tasks-section">
        <h2>📋 My Assigned Tasks</h2>
        {loading ? (
          <p>Loading tasks...</p>
        ) : myTasks.length > 0 ? (
          <div className="tasks-list">
            {myTasks.map((task) => (
              <div key={task.id} className={`task-item ${task.status}`}>
                <div className="task-info">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span className={`priority-badge ${task.priority}`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="due-date">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="task-status-control">
                  <label>Status:</label>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className={`status-select ${task.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-tasks">No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

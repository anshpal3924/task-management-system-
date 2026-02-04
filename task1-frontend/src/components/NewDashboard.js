import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import '../styles/Dashboard.css';

const NewDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      if (user.role === 'admin') {
        // Admin: fetch all tasks statistics
        const statsResponse = await taskAPI.getTaskStatistics();
        setStats({
          total: statsResponse.data.total || 0,
          pending: statsResponse.data.pending || 0,
          inProgress: statsResponse.data.inProgress || 0,
          completed: statsResponse.data.completed || 0
        });
        
        // Fetch recent tasks
        const tasksResponse = await taskAPI.getAllTasks();
        setRecentTasks(tasksResponse.data.tasks?.slice(0, 5) || []);
      } else {
        // User: fetch only their tasks
        const response = await taskAPI.getMyTasks();
        const tasks = response.data.tasks || [];
        setStats({
          total: tasks.length,
          pending: tasks.filter(t => t.status === 'pending').length,
          inProgress: tasks.filter(t => t.status === 'in-progress').length,
          completed: tasks.filter(t => t.status === 'completed').length
        });
        setRecentTasks(tasks.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, color, icon }) => (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-content">
        <div className="stat-info">
          <p className="stat-label">{title}</p>
          <h2 className="stat-value">{value}</h2>
        </div>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-chart">
        <div className={`mini-chart chart-${color}`}>
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className="chart-bar"
              style={{ height: `${Math.random() * 60 + 40}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const badges = {
      'pending': 'status-badge status-pending',
      'in-progress': 'status-badge status-progress',
      'completed': 'status-badge status-completed'
    };
    return badges[status] || 'status-badge';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, {user.name}! 👋</p>
        </div>
        {user.role === 'admin' && (
          <button 
            className="btn-primary"
            onClick={() => navigate('/tasks')}
          >
            View All Tasks
          </button>
        )}
      </div>

      <div className="stats-grid">
        <StatCard 
          title="Total Tasks" 
          value={stats.total} 
          color="purple"
          icon="📊"
        />
        <StatCard 
          title="Pending" 
          value={stats.pending} 
          color="orange"
          icon="⏳"
        />
        <StatCard 
          title="In Progress" 
          value={stats.inProgress} 
          color="blue"
          icon="🔄"
        />
        <StatCard 
          title="Completed" 
          value={stats.completed} 
          color="green"
          icon="✅"
        />
      </div>

      <div className="recent-tasks-section">
        <div className="section-header">
          <h2 className="section-title">Recent Tasks</h2>
          {user.role !== 'admin' && (
            <button 
              className="btn-text"
              onClick={() => navigate('/my-tasks')}
            >
              View All
            </button>
          )}
        </div>

        {recentTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No tasks yet</h3>
            <p>{user.role === 'admin' ? 'Create your first task to get started' : 'You have no tasks assigned yet'}</p>
          </div>
        ) : (
          <div className="tasks-table">
            <table>
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  {user.role === 'admin' && <th>Assigned To</th>}
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr key={task.id} onClick={() => navigate(`/tasks/${task.id}`)}>
                    <td>
                      <div className="task-title-cell">
                        <span className="task-title">{task.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(task.status)}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-badge priority-${task.priority}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td>
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                    </td>
                    {user.role === 'admin' && (
                      <td>{task.assignedToName || 'Unassigned'}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewDashboard;

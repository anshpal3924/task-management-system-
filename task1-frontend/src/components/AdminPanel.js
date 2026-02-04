import React, { useState, useEffect } from 'react';
import { authAPI, taskAPI } from '../services/api';
import TaskManagement from './admin/TaskManagement';
import Analytics from './admin/Analytics';
import UserManagement from './admin/UserManagement';
import '../styles/AdminDashboard.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [usersRes, tasksRes, statsRes] = await Promise.all([
        authAPI.getAllUsers(),
        taskAPI.getAllTasks(),
        taskAPI.getTaskStatistics()
      ]);

      setUsers(usersRes.data.users);
      setTasks(tasksRes.data.tasks);
      setStatistics(statsRes.data.statistics);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const refreshTasks = async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([
        taskAPI.getAllTasks(),
        taskAPI.getTaskStatistics()
      ]);
      setTasks(tasksRes.data.tasks);
      setStatistics(statsRes.data.statistics);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to refresh tasks');
    }
  };

  const tabs = [
    { id: 'analytics', label: '📊 Analytics', icon: '📊' },
    { id: 'tasks', label: '📋 Task Management', icon: '📋' },
    { id: 'users', label: '👥 User Management', icon: '👥' },
  ];

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>👑 Admin Dashboard</h1>
        <p>Manage tasks, users, and view analytics</p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError('')} className="alert-close">×</button>
        </div>
      )}

      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === 'analytics' && (
          <Analytics 
            statistics={statistics} 
            tasks={tasks} 
            users={users}
          />
        )}

        {activeTab === 'tasks' && (
          <TaskManagement 
            tasks={tasks} 
            users={users}
            onRefresh={refreshTasks}
          />
        )}

        {activeTab === 'users' && (
          <UserManagement users={users} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

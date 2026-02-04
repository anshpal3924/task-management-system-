import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import '../styles/UserTasks.css';

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchMyTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, activeFilter]);

  const fetchMyTasks = async () => {
    try {
      const response = await taskAPI.getMyTasks();
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;
    if (activeFilter !== 'all') {
      filtered = filtered.filter(task => task.status === activeFilter);
    }
    setFilteredTasks(filtered);
  };

  const handleStatusUpdate = async () => {
    if (!selectedTask || !newStatus) return;
    
    try {
      await taskAPI.updateTaskStatus(selectedTask.id, newStatus);
      setShowStatusModal(false);
      setSelectedTask(null);
      fetchMyTasks();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const openStatusModal = (task) => {
    setSelectedTask(task);
    setNewStatus(task.status);
    setShowStatusModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending': 'status-badge status-pending',
      'in-progress': 'status-badge status-progress',
      'completed': 'status-badge status-completed'
    };
    return badges[status] || 'status-badge';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'high': 'priority-badge priority-high',
      'medium': 'priority-badge priority-medium',
      'low': 'priority-badge priority-low'
    };
    return badges[priority] || 'priority-badge';
  };

  const filterTabs = [
    { id: 'all', label: 'All', count: tasks.length },
    { id: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
    { id: 'in-progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length },
    { id: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="user-tasks-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Tasks</h1>
          <p className="page-subtitle">View and manage your assigned tasks</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-tabs">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
              <span className="filter-count">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No tasks found</h3>
          <p>You don't have any {activeFilter !== 'all' ? activeFilter : ''} tasks assigned yet</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-card-header">
                <h3 className="task-card-title">{task.title}</h3>
                <span className={getStatusBadge(task.status)}>
                  {task.status.replace('-', ' ')}
                </span>
              </div>
              
              {task.description && (
                <p className="task-card-description">{task.description}</p>
              )}
              
              <div className="task-card-meta">
                <div className="meta-item">
                  <span className="meta-label">Priority:</span>
                  <span className={getPriorityBadge(task.priority)}>
                    {task.priority}
                  </span>
                </div>
                {task.dueDate && (
                  <div className="meta-item">
                    <span className="meta-label">Due:</span>
                    <span className="meta-value">
                      {new Date(task.dueDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
              </div>
              
              <button 
                className="update-status-btn"
                onClick={() => openStatusModal(task)}
              >
                Update Status
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Update Task Status</h2>
              <button className="modal-close" onClick={() => setShowStatusModal(false)}>
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <p className="task-name">{selectedTask?.title}</p>
              
              <div className="status-options">
                <label className="status-option">
                  <input
                    type="radio"
                    value="pending"
                    checked={newStatus === 'pending'}
                    onChange={(e) => setNewStatus(e.target.value)}
                  />
                  <span className="status-label">
                    <span className="status-icon">⏳</span>
                    Pending
                  </span>
                </label>
                
                <label className="status-option">
                  <input
                    type="radio"
                    value="in-progress"
                    checked={newStatus === 'in-progress'}
                    onChange={(e) => setNewStatus(e.target.value)}
                  />
                  <span className="status-label">
                    <span className="status-icon">🔄</span>
                    In Progress
                  </span>
                </label>
                
                <label className="status-option">
                  <input
                    type="radio"
                    value="completed"
                    checked={newStatus === 'completed'}
                    onChange={(e) => setNewStatus(e.target.value)}
                  />
                  <span className="status-label">
                    <span className="status-icon">✅</span>
                    Completed
                  </span>
                </label>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowStatusModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleStatusUpdate}>
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTasks;

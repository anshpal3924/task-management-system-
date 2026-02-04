import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI, authAPI } from '../services/api';
import '../styles/AllTasks.css';

const AllTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, activeFilter, searchQuery]);

  const fetchData = async () => {
    try {
      const [tasksRes, usersRes] = await Promise.all([
        taskAPI.getAllTasks(),
        authAPI.getAllUsers()
      ]);
      setTasks(tasksRes.data.tasks || []);
      setUsers(usersRes.data.users || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;

    // Filter by status
    if (activeFilter !== 'all') {
      filtered = filtered.filter(task => task.status === activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
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
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="all-tasks-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Tasks</h1>
          <p className="page-subtitle">Manage and track all tasks across the organization</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          <span>➕</span> Create Task
        </button>
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
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No tasks found</h3>
          <p>{searchQuery ? 'Try adjusting your search query' : 'Create your first task to get started'}</p>
        </div>
      ) : (
        <div className="tasks-table-container">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned To</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id} onClick={() => navigate(`/tasks/${task.id}`)}>
                  <td>
                    <div className="task-cell">
                      <h4 className="task-title">{task.title}</h4>
                      {task.description && (
                        <p className="task-description">{task.description.substring(0, 60)}...</p>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={getStatusBadge(task.status)}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className={getPriorityBadge(task.priority)}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <div className="assignee-cell">
                      <div className="assignee-avatar">
                        {task.assignedToName ? task.assignedToName.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span>{task.assignedToName || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td>
                    {task.dueDate ? (
                      <span className="due-date">
                        {new Date(task.dueDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    ) : (
                      <span className="no-date">No due date</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons" onClick={(e) => e.stopPropagation()}>
                      <button className="action-btn edit-btn" title="Edit">
                        ✏️
                      </button>
                      <button className="action-btn delete-btn" title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTasks;

import React from 'react';

const Analytics = ({ statistics, tasks, users }) => {
  if (!statistics) {
    return <div>Loading statistics...</div>;
  }

  const completionRate = statistics.total > 0 
    ? ((statistics.completed / statistics.total) * 100).toFixed(1)
    : 0;

  const productivityScore = statistics.total > 0
    ? ((statistics.completed + statistics.inProgress * 0.5) / statistics.total * 100).toFixed(1)
    : 0;

  // Calculate user task distribution
  const userTaskCount = {};
  tasks.forEach(task => {
    if (task.assignedTo) {
      userTaskCount[task.assignedTo] = (userTaskCount[task.assignedTo] || 0) + 1;
    }
  });

  const topUsers = Object.entries(userTaskCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([userId, count]) => {
      const user = users.find(u => u.id === userId);
      return { name: user?.name || 'Unknown', count };
    });

  // Recent activity
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="analytics-container">
      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card total">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Total Tasks</h3>
            <p className="metric-value">{statistics.total}</p>
            <span className="metric-label">All tasks</span>
          </div>
        </div>

        <div className="metric-card pending">
          <div className="metric-icon">⏳</div>
          <div className="metric-content">
            <h3>Pending</h3>
            <p className="metric-value">{statistics.pending}</p>
            <span className="metric-label">Awaiting start</span>
          </div>
        </div>

        <div className="metric-card in-progress">
          <div className="metric-icon">🔄</div>
          <div className="metric-content">
            <h3>In Progress</h3>
            <p className="metric-value">{statistics.inProgress}</p>
            <span className="metric-label">Active tasks</span>
          </div>
        </div>

        <div className="metric-card completed">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <h3>Completed</h3>
            <p className="metric-value">{statistics.completed}</p>
            <span className="metric-label">Finished tasks</span>
          </div>
        </div>

        <div className="metric-card overdue">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <h3>Overdue</h3>
            <p className="metric-value">{statistics.overdue}</p>
            <span className="metric-label">Past deadline</span>
          </div>
        </div>

        <div className="metric-card users">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>Total Users</h3>
            <p className="metric-value">{users.length}</p>
            <span className="metric-label">Registered users</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Task Status Distribution */}
        <div className="chart-card">
          <h3>📊 Task Status Distribution</h3>
          <div className="chart-content">
            <div className="progress-chart">
              <div className="progress-item">
                <div className="progress-label">
                  <span className="dot pending-dot"></span>
                  <span>Pending</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar pending-bar"
                    style={{ width: `${statistics.total > 0 ? (statistics.pending / statistics.total * 100) : 0}%` }}
                  ></div>
                </div>
                <span className="progress-value">{statistics.pending}</span>
              </div>

              <div className="progress-item">
                <div className="progress-label">
                  <span className="dot in-progress-dot"></span>
                  <span>In Progress</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar in-progress-bar"
                    style={{ width: `${statistics.total > 0 ? (statistics.inProgress / statistics.total * 100) : 0}%` }}
                  ></div>
                </div>
                <span className="progress-value">{statistics.inProgress}</span>
              </div>

              <div className="progress-item">
                <div className="progress-label">
                  <span className="dot completed-dot"></span>
                  <span>Completed</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar completed-bar"
                    style={{ width: `${statistics.total > 0 ? (statistics.completed / statistics.total * 100) : 0}%` }}
                  ></div>
                </div>
                <span className="progress-value">{statistics.completed}</span>
              </div>

              <div className="progress-item">
                <div className="progress-label">
                  <span className="dot cancelled-dot"></span>
                  <span>Cancelled</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar cancelled-bar"
                    style={{ width: `${statistics.total > 0 ? (statistics.cancelled / statistics.total * 100) : 0}%` }}
                  ></div>
                </div>
                <span className="progress-value">{statistics.cancelled}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="chart-card">
          <h3>🎯 Priority Distribution</h3>
          <div className="chart-content">
            <div className="priority-chart">
              <div className="priority-item urgent">
                <div className="priority-bar" style={{ height: `${statistics.total > 0 ? (statistics.byPriority.urgent / statistics.total * 100) : 0}%` }}>
                  <span className="priority-count">{statistics.byPriority.urgent}</span>
                </div>
                <span className="priority-label">Urgent</span>
              </div>
              <div className="priority-item high">
                <div className="priority-bar" style={{ height: `${statistics.total > 0 ? (statistics.byPriority.high / statistics.total * 100) : 0}%` }}>
                  <span className="priority-count">{statistics.byPriority.high}</span>
                </div>
                <span className="priority-label">High</span>
              </div>
              <div className="priority-item medium">
                <div className="priority-bar" style={{ height: `${statistics.total > 0 ? (statistics.byPriority.medium / statistics.total * 100) : 0}%` }}>
                  <span className="priority-count">{statistics.byPriority.medium}</span>
                </div>
                <span className="priority-label">Medium</span>
              </div>
              <div className="priority-item low">
                <div className="priority-bar" style={{ height: `${statistics.total > 0 ? (statistics.byPriority.low / statistics.total * 100) : 0}%` }}>
                  <span className="priority-count">{statistics.byPriority.low}</span>
                </div>
                <span className="priority-label">Low</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="chart-card">
          <h3>📈 Performance Metrics</h3>
          <div className="chart-content">
            <div className="performance-metrics">
              <div className="performance-circle">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle completed-circle"
                    strokeDasharray={`${completionRate}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">{completionRate}%</text>
                </svg>
                <p>Completion Rate</p>
              </div>
              <div className="performance-circle">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle productivity-circle"
                    strokeDasharray={`${productivityScore}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">{productivityScore}%</text>
                </svg>
                <p>Productivity Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Users */}
        <div className="chart-card">
          <h3>🏆 Top Users by Tasks</h3>
          <div className="chart-content">
            <div className="top-users-list">
              {topUsers.length > 0 ? (
                topUsers.map((user, index) => (
                  <div key={index} className="top-user-item">
                    <span className="user-rank">#{index + 1}</span>
                    <span className="user-name">{user.name}</span>
                    <span className="user-task-count">{user.count} tasks</span>
                  </div>
                ))
              ) : (
                <p className="no-data">No user data available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h3>📝 Recent Activity</h3>
        <div className="activity-list">
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => {
              const assignedUser = users.find(u => u.id === task.assignedTo);
              return (
                <div key={task.id} className="activity-item">
                  <div className={`activity-icon ${task.status}`}>
                    {task.status === 'completed' ? '✅' : 
                     task.status === 'in-progress' ? '🔄' :
                     task.status === 'cancelled' ? '❌' : '⏳'}
                  </div>
                  <div className="activity-content">
                    <h4>{task.title}</h4>
                    <p>
                      Assigned to <strong>{assignedUser?.name || 'Unknown'}</strong>
                      {' • '}
                      <span className={`status-badge ${task.status}`}>{task.status}</span>
                      {' • '}
                      <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
                    </p>
                  </div>
                  <div className="activity-time">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-data">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

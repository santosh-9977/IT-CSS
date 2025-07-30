import React from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { tasks, getTaskStats } = useTask();
  const stats = getTaskStats();

  const getRecentTasks = () => {
    return tasks
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);
  };

  const getHighPriorityTasks = () => {
    return tasks
      .filter(task => task.priority === 'high' && task.status !== 'completed')
      .slice(0, 3);
  };

  const getCompletionRate = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  };

  const recentTasks = getRecentTasks();
  const highPriorityTasks = getHighPriorityTasks();
  const completionRate = getCompletionRate();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Welcome to your task management dashboard</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Tasks</h3>
            <div className="stat-number">{stats.total}</div>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending</h3>
            <div className="stat-number">{stats.pending}</div>
          </div>
        </div>

        <div className="stat-card in-progress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <div className="stat-number">{stats.inProgress}</div>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed</h3>
            <div className="stat-number">{stats.completed}</div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-card">
          <h3>📈 Completion Rate</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="progress-text">{completionRate}% Complete</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>🔥 High Priority Tasks</h2>
            <Link to="/tasks" className="view-all-link">View All</Link>
          </div>
          
          {highPriorityTasks.length === 0 ? (
            <div className="empty-section">
              <p>🎉 No high priority tasks pending!</p>
            </div>
          ) : (
            <div className="priority-tasks">
              {highPriorityTasks.map(task => (
                <div key={task.id} className="priority-task">
                  <div className="task-priority">🔴</div>
                  <div className="task-info">
                    <h4>{task.title}</h4>
                    <p className="task-status">{task.status.replace('-', ' ')}</p>
                  </div>
                  <div className="task-date">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>🕒 Recent Activity</h2>
            <Link to="/tasks" className="view-all-link">View All</Link>
          </div>
          
          {recentTasks.length === 0 ? (
            <div className="empty-section">
              <p>📝 No tasks yet. Create your first task!</p>
              <Link to="/add-task" className="btn btn-primary">
                ➕ Add Task
              </Link>
            </div>
          ) : (
            <div className="recent-tasks">
              {recentTasks.map(task => (
                <div key={task.id} className="recent-task">
                  <div className="task-status-icon">
                    {task.status === 'completed' ? '✅' : 
                     task.status === 'in-progress' ? '🔄' : '⏳'}
                  </div>
                  <div className="task-info">
                    <h4>{task.title}</h4>
                    <p className="task-meta">
                      {task.priority} priority • {task.status.replace('-', ' ')}
                    </p>
                  </div>
                  <div className="task-date">
                    {new Date(task.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <h2>⚡ Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/add-task" className="action-btn primary">
            <span className="action-icon">➕</span>
            <span className="action-text">Add New Task</span>
          </Link>
          
          <Link to="/tasks" className="action-btn secondary">
            <span className="action-icon">📝</span>
            <span className="action-text">View All Tasks</span>
          </Link>
          
          <Link to="/completed" className="action-btn success">
            <span className="action-icon">✅</span>
            <span className="action-text">Completed Tasks</span>
          </Link>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="productivity-tips">
          <h3>💡 Productivity Tips</h3>
          <div className="tips-grid">
            <div className="tip">
              <div className="tip-icon">🎯</div>
              <p>Focus on high-priority tasks first</p>
            </div>
            <div className="tip">
              <div className="tip-icon">⏰</div>
              <p>Break large tasks into smaller ones</p>
            </div>
            <div className="tip">
              <div className="tip-icon">📅</div>
              <p>Review and update your tasks regularly</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
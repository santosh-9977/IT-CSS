import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import '../styles/TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, deleteTask, toggleTaskStatus } = useTask();

  const task = getTaskById(id);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      navigate('/');
    }
  };

  const handleToggleStatus = () => {
    toggleTaskStatus(id);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffd93d';
      case 'low': return '#6bcf7f';
      default: return '#74c0fc';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!task) {
    return (
      <div className="task-detail-container">
        <div className="error-state">
          <div className="error-icon">❌</div>
          <h2>Task Not Found</h2>
          <p>The task you're looking for doesn't exist or may have been deleted.</p>
          <Link to="/" className="btn btn-primary">
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="task-detail-container">
      <div className="task-detail-header">
        <button 
          onClick={() => navigate('/')} 
          className="back-button"
          title="Go back to tasks"
        >
          ← Back to Tasks
        </button>
      </div>

      <div className="task-detail-card">
        <div className="task-detail-main">
          <div className="task-status-section">
            <div 
              className="priority-indicator-large"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            ></div>
            <button
              className={`status-toggle-large ${task.status}`}
              onClick={handleToggleStatus}
              title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
            >
              {task.status === 'completed' ? '✓' : '○'}
            </button>
          </div>

          <div className="task-content-detailed">
            <h1 className={`task-title-large ${task.status === 'completed' ? 'completed' : ''}`}>
              {task.title}
            </h1>
            
            <div className="task-meta-detailed">
              <div className="meta-item">
                <span className="meta-label">Status:</span>
                <span className={`status-badge ${task.status}`}>
                  {task.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                </span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Priority:</span>
                <span className={`priority-badge-large priority-${task.priority}`}>
                  {task.priority === 'high' && '🔴 High'}
                  {task.priority === 'medium' && '🟡 Medium'}
                  {task.priority === 'low' && '🟢 Low'}
                </span>
              </div>
            </div>

            <div className="task-description-detailed">
              <h3>Description</h3>
              <p>{task.description}</p>
            </div>
          </div>
        </div>

        <div className="task-timestamps">
          <div className="timestamp-item">
            <span className="timestamp-label">Created:</span>
            <span className="timestamp-value">{formatDate(task.createdAt)}</span>
          </div>
          {task.updatedAt !== task.createdAt && (
            <div className="timestamp-item">
              <span className="timestamp-label">Last Updated:</span>
              <span className="timestamp-value">{formatDate(task.updatedAt)}</span>
            </div>
          )}
        </div>

        <div className="task-actions-detailed">
          <Link 
            to={`/edit/${task.id}`} 
            className="btn btn-primary"
          >
            ✏️ Edit Task
          </Link>
          <button
            onClick={handleToggleStatus}
            className={`btn ${task.status === 'completed' ? 'btn-warning' : 'btn-success'}`}
          >
            {task.status === 'completed' ? '↩️ Mark Pending' : '✅ Mark Complete'}
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
          >
            🗑️ Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
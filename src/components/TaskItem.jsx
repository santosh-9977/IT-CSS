import React from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import '../styles/TaskItem.css';

const TaskItem = ({ task }) => {
  const { deleteTask, toggleTaskStatus } = useTask();

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleToggleStatus = (e) => {
    e.preventDefault();
    toggleTaskStatus(task.id);
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
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-header">
        <div 
          className="priority-indicator"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        ></div>
        <div className="task-status">
          <button
            className={`status-toggle ${task.status}`}
            onClick={handleToggleStatus}
            title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
          >
            {task.status === 'completed' ? '✓' : '○'}
          </button>
        </div>
      </div>

      <div className="task-content">
        <h3 className="task-title">
          <Link to={`/task/${task.id}`} className="task-link">
            {task.title}
          </Link>
        </h3>
        <p className="task-description">
          {task.description.length > 100 
            ? `${task.description.substring(0, 100)}...` 
            : task.description
          }
        </p>
      </div>

      <div className="task-meta">
        <div className="task-priority">
          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>
        <div className="task-date">
          {formatDate(task.createdAt)}
        </div>
      </div>

      <div className="task-actions">
        <Link 
          to={`/edit/${task.id}`} 
          className="btn btn-secondary btn-sm"
          title="Edit task"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          className="btn btn-danger btn-sm"
          title="Delete task"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
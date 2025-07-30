import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import '../styles/TaskItem.css';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status
  });

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask(task.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'pending': return '⏳';
      default: return '📋';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-edit-form">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="edit-title"
            placeholder="Task title"
          />
          
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="edit-description"
            placeholder="Task description"
            rows="3"
          />
          
          <div className="edit-controls">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
              className="edit-priority"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <select
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
              className="edit-status"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="edit-actions">
            <button onClick={handleSave} className="btn btn-save">
              💾 Save
            </button>
            <button onClick={handleCancel} className="btn btn-cancel">
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.status} priority-${task.priority}`}>
      <div className="task-header">
        <div className="task-meta">
          <span className="priority-indicator">
            {getPriorityIcon(task.priority)}
          </span>
          <span className="status-indicator">
            {getStatusIcon(task.status)}
          </span>
          <span className="task-id">#{task.id.slice(-4)}</span>
        </div>
        
        <div className="task-actions">
          <button 
            onClick={handleEdit} 
            className="btn btn-edit" 
            title="Edit task"
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete} 
            className="btn btn-delete" 
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>
      
      <div className="task-footer">
        <div className="task-status-controls">
          <button
            onClick={() => handleStatusChange('pending')}
            className={`status-btn ${task.status === 'pending' ? 'active' : ''}`}
            title="Mark as Pending"
          >
            ⏳ Pending
          </button>
          <button
            onClick={() => handleStatusChange('in-progress')}
            className={`status-btn ${task.status === 'in-progress' ? 'active' : ''}`}
            title="Mark as In Progress"
          >
            🔄 In Progress
          </button>
          <button
            onClick={() => handleStatusChange('completed')}
            className={`status-btn ${task.status === 'completed' ? 'active' : ''}`}
            title="Mark as Completed"
          >
            ✅ Completed
          </button>
        </div>
        
        <div className="task-dates">
          <small className="created-date">
            Created: {formatDate(task.createdAt)}
          </small>
          {task.updatedAt !== task.createdAt && (
            <small className="updated-date">
              Updated: {formatDate(task.updatedAt)}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
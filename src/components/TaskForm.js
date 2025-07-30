import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import '../styles/TaskForm.css';

const TaskForm = () => {
  const navigate = useNavigate();
  const { addTask } = useTask();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters long';
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      addTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        status: formData.status
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending'
      });
      
      // Navigate to tasks page
      navigate('/tasks');
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending'
    });
    setErrors({});
  };

  return (
    <div className="task-form-container">
      <div className="task-form-header">
        <h2>✨ Create New Task</h2>
        <p>Add a new task to your task manager</p>
      </div>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            📝 Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter task title..."
            maxLength="100"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
          <small className="char-count">{formData.title.length}/100</small>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            📄 Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Enter task description..."
            rows="4"
            maxLength="500"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
          <small className="char-count">{formData.description.length}/500</small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              🎯 Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">
              📊 Initial Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            ➕ Create Task
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            🔄 Reset Form
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/tasks')} 
            className="btn btn-outline"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
      
      <div className="form-tips">
        <h4>💡 Tips for Better Task Management:</h4>
        <ul>
          <li>Use clear, actionable titles</li>
          <li>Set appropriate priorities to focus on what matters</li>
          <li>Add detailed descriptions for complex tasks</li>
          <li>Update task status as you progress</li>
        </ul>
      </div>
    </div>
  );
};

export default TaskForm;
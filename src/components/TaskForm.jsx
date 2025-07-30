import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import '../styles/TaskForm.css';

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addTask, updateTask, getTaskById } = useTask();
  
  const isEditing = Boolean(id);
  const existingTask = isEditing ? getTaskById(id) : null;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && existingTask) {
      setFormData({
        title: existingTask.title,
        description: existingTask.description,
        priority: existingTask.priority
      });
    }
  }, [isEditing, existingTask]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (!['low', 'medium', 'high'].includes(formData.priority)) {
      newErrors.priority = 'Please select a valid priority';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority
      };

      if (isEditing) {
        updateTask(id, taskData);
      } else {
        addTask(taskData);
      }

      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
      setErrors({ submit: 'Failed to save task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isEditing && !existingTask) {
    return (
      <div className="task-form-container">
        <div className="error-message">
          <h2>Task not found</h2>
          <p>The task you're trying to edit doesn't exist.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go back to tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-form-container">
      <div className="task-form-card">
        <div className="form-header">
          <h1>{isEditing ? 'Edit Task' : 'Add New Task'}</h1>
          <p className="form-subtitle">
            {isEditing 
              ? 'Update your task details below' 
              : 'Fill in the details to create a new task'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter task title..."
              maxLength={100}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Enter task description..."
              rows={4}
              maxLength={500}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
            <div className="character-count">
              {formData.description.length}/500 characters
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className={`form-select ${errors.priority ? 'error' : ''}`}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            {errors.priority && <span className="error-text">{errors.priority}</span>}
          </div>

          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (isEditing ? 'Updating...' : 'Creating...') 
                : (isEditing ? 'Update Task' : 'Create Task')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
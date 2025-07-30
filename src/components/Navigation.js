import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import '../styles/Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const { getTaskStats } = useTask();
  const stats = getTaskStats();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>Task Manager</h1>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <span className="nav-icon">📋</span>
            Dashboard
          </Link>
          
          <Link 
            to="/tasks" 
            className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}
          >
            <span className="nav-icon">📝</span>
            All Tasks
            <span className="task-count">{stats.total}</span>
          </Link>
          
          <Link 
            to="/add-task" 
            className={`nav-link ${location.pathname === '/add-task' ? 'active' : ''}`}
          >
            <span className="nav-icon">➕</span>
            Add Task
          </Link>
          
          <Link 
            to="/completed" 
            className={`nav-link ${location.pathname === '/completed' ? 'active' : ''}`}
          >
            <span className="nav-icon">✅</span>
            Completed
            <span className="task-count">{stats.completed}</span>
          </Link>
        </div>
        
        <div className="nav-stats">
          <div className="stat-item">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
import React from 'react';
import { useTask } from '../context/TaskContext';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const TaskList = ({ showCompleted = false, title = "All Tasks" }) => {
  const { getFilteredTasks, setFilter, setSearchTerm, filter, searchTerm } = useTask();
  
  let tasks = getFilteredTasks();
  
  // If showCompleted is true, only show completed tasks
  if (showCompleted) {
    tasks = tasks.filter(task => task.status === 'completed');
  }

  // Sort tasks by priority and creation date
  const sortedTasks = tasks.sort((a, b) => {
    // Priority order: high > medium > low
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    // If same priority, sort by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setFilter('all');
    setSearchTerm('');
  };

  const getTaskCountByStatus = () => {
    const all = tasks.length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const inProgress = tasks.filter(task => task.status === 'in-progress').length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    
    return { all, pending, inProgress, completed };
  };

  const taskCounts = getTaskCountByStatus();

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>{title}</h2>
        
        {!showCompleted && (
          <div className="task-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="🔍 Search tasks..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="clear-search"
                  title="Clear search"
                >
                  ❌
                </button>
              )}
            </div>
            
            <div className="filter-container">
              <div className="filter-buttons">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                >
                  📋 All ({taskCounts.all})
                </button>
                <button
                  onClick={() => handleFilterChange('pending')}
                  className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                >
                  ⏳ Pending ({taskCounts.pending})
                </button>
                <button
                  onClick={() => handleFilterChange('in-progress')}
                  className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
                >
                  🔄 In Progress ({taskCounts.inProgress})
                </button>
                <button
                  onClick={() => handleFilterChange('completed')}
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                >
                  ✅ Completed ({taskCounts.completed})
                </button>
              </div>
              
              {(filter !== 'all' || searchTerm) && (
                <button onClick={clearFilters} className="clear-filters">
                  🔄 Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="task-summary">
        {searchTerm && (
          <p className="search-results">
            Found {sortedTasks.length} task{sortedTasks.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </p>
        )}
        
        {!searchTerm && filter !== 'all' && (
          <p className="filter-results">
            Showing {sortedTasks.length} {filter.replace('-', ' ')} task{sortedTasks.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="task-list">
        {sortedTasks.length === 0 ? (
          <div className="empty-state">
            {searchTerm ? (
              <div className="empty-search">
                <div className="empty-icon">🔍</div>
                <h3>No tasks found</h3>
                <p>No tasks match your search "{searchTerm}"</p>
                <button onClick={() => setSearchTerm('')} className="btn btn-primary">
                  Clear Search
                </button>
              </div>
            ) : filter !== 'all' ? (
              <div className="empty-filter">
                <div className="empty-icon">📭</div>
                <h3>No {filter.replace('-', ' ')} tasks</h3>
                <p>You don't have any {filter.replace('-', ' ')} tasks yet.</p>
                <button onClick={() => setFilter('all')} className="btn btn-primary">
                  Show All Tasks
                </button>
              </div>
            ) : showCompleted ? (
              <div className="empty-completed">
                <div className="empty-icon">🎉</div>
                <h3>No completed tasks yet</h3>
                <p>Complete some tasks to see them here!</p>
              </div>
            ) : (
              <div className="empty-all">
                <div className="empty-icon">📝</div>
                <h3>No tasks yet</h3>
                <p>Create your first task to get started!</p>
                <a href="/add-task" className="btn btn-primary">
                  ➕ Add Your First Task
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="tasks-grid">
            {sortedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {sortedTasks.length > 0 && (
        <div className="task-list-footer">
          <p className="task-count">
            Showing {sortedTasks.length} of {tasks.length} tasks
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
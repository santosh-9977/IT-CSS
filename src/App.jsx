import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import './styles/App.css';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📝 Task Manager
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            All Tasks
          </Link>
          <Link 
            to="/add" 
            className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}
          >
            Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add" element={<TaskForm />} />
              <Route path="/edit/:id" element={<TaskForm />} />
              <Route path="/task/:id" element={<TaskDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
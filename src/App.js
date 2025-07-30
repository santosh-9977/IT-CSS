import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import AllTasks from './pages/AllTasks';
import AddTask from './pages/AddTask';
import CompletedTasks from './pages/CompletedTasks';
import './styles/App.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<AllTasks />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/completed" element={<CompletedTasks />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
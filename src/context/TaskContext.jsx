import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return { ...state, tasks: [...state.tasks, newTask] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload, updatedAt: new Date().toISOString() }
            : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  filter: 'all', // all, pending, completed
  searchTerm: ''
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch({ type: 'SET_TASKS', payload: JSON.parse(savedTasks) });
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTask = (id, updates) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, ...updates } });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTaskStatus = (id) => {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { 
        status: task.status === 'pending' ? 'completed' : 'pending' 
      });
    }
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH', payload: term });
  };

  const getFilteredTasks = () => {
    let filtered = state.tasks;

    // Apply status filter
    if (state.filter !== 'all') {
      filtered = filtered.filter(task => task.status === state.filter);
    }

    // Apply search filter
    if (state.searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getTaskById = (id) => {
    return state.tasks.find(task => task.id === id);
  };

  const value = {
    tasks: state.tasks,
    filteredTasks: getFilteredTasks(),
    filter: state.filter,
    searchTerm: state.searchTerm,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setFilter,
    setSearchTerm,
    getTaskById
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
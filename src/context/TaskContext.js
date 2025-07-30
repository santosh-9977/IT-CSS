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
        priority: action.payload.priority || 'medium',
        status: action.payload.status || 'pending',
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
  filter: 'all',
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

  const addTask = (taskData) => {
    dispatch({ type: 'ADD_TASK', payload: taskData });
  };

  const updateTask = (id, taskData) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, ...taskData } });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH', payload: term });
  };

  const getFilteredTasks = () => {
    let filteredTasks = state.tasks;

    // Apply search filter
    if (state.searchTerm) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (state.filter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === state.filter);
    }

    return filteredTasks;
  };

  const getTaskStats = () => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(task => task.status === 'completed').length;
    const pending = state.tasks.filter(task => task.status === 'pending').length;
    const inProgress = state.tasks.filter(task => task.status === 'in-progress').length;

    return { total, completed, pending, inProgress };
  };

  const value = {
    tasks: state.tasks,
    filter: state.filter,
    searchTerm: state.searchTerm,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    setSearchTerm,
    getFilteredTasks,
    getTaskStats
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
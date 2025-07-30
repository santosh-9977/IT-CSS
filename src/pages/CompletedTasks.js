import React from 'react';
import TaskList from '../components/TaskList';

const CompletedTasks = () => {
  return <TaskList showCompleted={true} title="✅ Completed Tasks" />;
};

export default CompletedTasks;
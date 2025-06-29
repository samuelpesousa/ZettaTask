// frontend/src/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

// Aceita a nova prop onUpdateTask
function TaskList({ tasks, onUpdateTask }) {
  if (tasks.length === 0) {
    return <p>Nenhuma tarefa encontrada.</p>;
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onUpdateTask={onUpdateTask} // Passa a função para o TaskItem
        />
      ))}
    </div>
  );
}

export default TaskList;
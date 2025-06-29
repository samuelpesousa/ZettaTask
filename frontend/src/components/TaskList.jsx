// frontend/src/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

// Aceita a nova prop onDeleteTask
function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p>Nenhuma tarefa encontrada.</p>;
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask} // Passa a função para o TaskItem
        />
      ))}
    </div>
  );
}

export default TaskList;
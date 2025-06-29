// frontend/src/components/TaskItem.jsx

import React from 'react';
import styles from './Task.module.css';

function TaskItem({ task, onUpdateTask, onDeleteTask }) {

  const handleDeleteClick = () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDeleteTask(task.id);
    }
  };

  // Define as classes dinamicamente com base no status
  const taskItemClasses = `${styles.taskItem} ${task.status === 'concluída' ? styles.concluidaBorder : styles.pendenteBorder}`;
  const statusClasses = `${styles.taskStatus} ${task.status === 'concluída' ? styles.statusConcluida : styles.statusPendente}`;

  return (
    <div className={taskItemClasses}>
      <div className={styles.taskHeader}>
        <h3>{task.nome}</h3>
        <div className={styles.taskActions}>
          <span className={statusClasses}>
            {task.status}
          </span>

          {task.status === 'pendente' && (
            <button onClick={() => onUpdateTask(task.id, 'concluída')}>
              Concluir
            </button>
          )}

          <button onClick={handleDeleteClick} className={styles.deleteButton}>
            Excluir
          </button>
        </div>
      </div>
      <p>{task.descricao}</p>
    </div>
  );
}

export default TaskItem;
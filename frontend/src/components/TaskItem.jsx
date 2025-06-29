// frontend/src/components/TaskItem.jsx

import React from 'react';
import styles from './Task.module.css'; // Importa os estilos do módulo CSS

function TaskItem({ task, onUpdateTask, onDeleteTask }) {

  // Função chamada ao clicar no botão de excluir
  const handleDeleteClick = () => {
    // Pede confirmação ao usuário antes de prosseguir
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDeleteTask(task.id); // Chama a função passada pelo componente pai (DashboardPage)
    }
  };

  return (
    <div className={styles.taskItem}>
      <div className={styles.taskHeader}>
        <h3>{task.nome}</h3>
        <div className={styles.taskActions}>
          <span className={`${styles.taskStatus} ${task.status === 'concluída' ? styles.statusConcluida : styles.statusPendente}`}>
            {task.status}
          </span>
          
          {/* O botão "Concluir" só aparece se a tarefa estiver pendente */}
          {task.status === 'pendente' && (
            <button onClick={() => onUpdateTask(task.id, 'concluída')}>
              Concluir
            </button>
          )}

          {/* Botão para excluir a tarefa */}
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
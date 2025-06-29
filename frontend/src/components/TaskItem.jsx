import React from 'react';

function TaskItem({ task, onUpdateTask, onDeleteTask }) { // Adicionamos a prop onDeleteTask
  const styles = { /* ...código de estilos existente... */ };
  // ... (código existente para styles e handleUpdateClick)

  const handleDeleteClick = () => {
    // Pede confirmação ao usuário antes de excluir
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDeleteTask(task.id); // Chama a função passada pelo pai
    }
  };

  return (
    <div style={styles.taskItem}>
      <div style={styles.taskHeader}>
        <h3>{task.nome}</h3>
        <div>
          <span style={styles.taskStatus}>{task.status}</span>
          {task.status === 'pendente' && (
            <button onClick={() => onUpdateTask(task.id, 'concluída')} style={styles.button}>
              Concluir
            </button>
          )}
          {/* Botão de Excluir */}
          <button onClick={handleDeleteClick} style={{...styles.button, backgroundColor: 'red', color: 'white'}}>
            Excluir
          </button>
        </div>
      </div>
      <p>{task.descricao}</p>
    </div>
  );
}

export default TaskItem;
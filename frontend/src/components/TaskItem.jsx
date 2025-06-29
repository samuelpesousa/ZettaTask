import React from 'react';

const styles = {
  taskItem: {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskStatus: {
    padding: '2px 8px',
    borderRadius: '12px',
    color: 'white',
    backgroundColor: 'orange', // Estilo padrão para 'pendente'
  }
};

function TaskItem({ task }) {
  // Muda a cor do status da tarefa
  if(task.status === 'concluída') {
    styles.taskStatus.backgroundColor = 'green';
  }

  return (
    <div style={styles.taskItem}>
      <div style={styles.taskHeader}>
        <h3>{task.nome}</h3>
        <span style={styles.taskStatus}>{task.status}</span>
      </div>
      <p>{task.descricao}</p>
    </div>
  );
}

export default TaskItem;
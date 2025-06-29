// frontend/src/components/TaskItem.jsx
import React from 'react';

function TaskItem({ task, onUpdateTask }) { // Adicionamos a prop onUpdateTask
  // Objeto de estilo para ser mais fácil de ler
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
    // Define a cor com base no status da tarefa
    taskStatus: {
      padding: '2px 8px',
      borderRadius: '12px',
      color: 'white',
      backgroundColor: task.status === 'concluída' ? 'green' : 'orange',
    },
    button: {
      marginLeft: '10px',
      cursor: 'pointer',
    }
  };

  const handleUpdateClick = () => {
    // Chama a função passada pelo componente pai
    onUpdateTask(task.id, 'concluída');
  };

  return (
    <div style={styles.taskItem}>
      <div style={styles.taskHeader}>
        <h3>{task.nome}</h3>
        <div>
          <span style={styles.taskStatus}>{task.status}</span>
          {/* Mostra o botão apenas se a tarefa estiver pendente */}
          {task.status === 'pendente' && (
            <button onClick={handleUpdateClick} style={styles.button}>
              Concluir
            </button>
          )}
        </div>
      </div>
      <p>{task.descricao}</p>
    </div>
  );
}

export default TaskItem;
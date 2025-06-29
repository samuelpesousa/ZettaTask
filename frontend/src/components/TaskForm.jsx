import React, { useState } from 'react';
import api from '../services/api';
import styles from './TaskForm.module.css'; 

function TaskForm({ onTaskCreated }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome) {
      alert('O nome da tarefa é obrigatório.');
      return;
    }

    try {
      const response = await api.post('/tasks', { nome, descricao });
      onTaskCreated(response.data);
      setNome('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Não foi possível criar a tarefa.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Adicionar Tarefa:</h3>
      <input
        type="text"
        placeholder="Nome da tarefa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TaskForm;
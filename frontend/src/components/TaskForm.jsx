import React, { useState } from 'react';
import api from '../services/api';

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
      // Chama a função do componente pai para atualizar a lista
      onTaskCreated(response.data); 
      // Limpa os campos do formulário
      setNome('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Não foi possível criar a tarefa.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Adicionar Nova Tarefa</h3>
      <input
        type="text"
        placeholder="Nome da tarefa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TaskForm;
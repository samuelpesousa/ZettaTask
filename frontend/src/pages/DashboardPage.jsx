// frontend/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]); // Estado para armazenar a lista de tarefas

  // Hook para buscar as tarefas do backend quando a página carrega
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks'); // Chama o endpoint de listagem
        setTasks(response.data); // Atualiza o estado com as tarefas recebidas
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        // Se o token for inválido (erro 401), desloga o usuário
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };

    fetchTasks();
  }, []); // O array vazio [] como dependência garante que o useEffect rode apenas uma vez

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
    navigate('/login');
  };

  // Função chamada pelo TaskForm quando uma nova tarefa é criada
  const handleTaskCreated = (newTask) => {
    // Adiciona a nova tarefa no início da lista para uma UI mais dinâmica
    setTasks(currentTasks => [newTask, ...currentTasks]);
  };

  // Função chamada pelo TaskItem para atualizar o status de uma tarefa
  const handleUpdateTask = async (taskId, newStatus) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
      const updatedTask = response.data;
      
      // Atualiza a lista de tarefas, substituindo a antiga pela nova versão
      setTasks(currentTasks => 
        currentTasks.map(task => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Não foi possível atualizar a tarefa.');
    }
  };

  // Função chamada pelo TaskItem para excluir uma tarefa
  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      
      // Atualiza a lista de tarefas, filtrando para remover a que foi excluída
      setTasks(currentTasks => 
        currentTasks.filter(task => task.id !== taskId)
      );
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      alert('Não foi possível excluir a tarefa.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>ZettaTask - Seu Dashboard</h1>
        <button onClick={handleLogout}>Sair</button>
      </header>
      
      <hr />

      <TaskForm onTaskCreated={handleTaskCreated} />

      <h2>Minhas Tarefas</h2>
      <TaskList 
        tasks={tasks} 
        onUpdateTask={handleUpdateTask} 
        onDeleteTask={handleDeleteTask} 
      />
    </div>
  );
}

export default DashboardPage;
// frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        if (error.response && error.response.status === 401) handleLogout();
      }
    };
    fetchTasks();
  }, []);

  const handleLogout = () => { /* ...código existente... */ };
  const handleTaskCreated = (newTask) => { /* ...código existente... */ };

  // 1. Nova função para lidar com a atualização
  const handleUpdateTask = async (taskId, newStatus) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
      const updatedTask = response.data;

      // Atualiza a lista de tarefas, substituindo a antiga pela nova
      setTasks(currentTasks => 
        currentTasks.map(task => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Não foi possível atualizar a tarefa.');
    }
  };

  return (
    <div>
      {/* ...cabeçalho e TaskForm existentes... */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>ZettaTask - Seu Dashboard</h1>
        <button onClick={handleLogout}>Sair</button>
      </header>
      <hr />
      <TaskForm onTaskCreated={handleTaskCreated} />
      <h2>Minhas Tarefas</h2>

      {/* 2. Passe a nova função para a TaskList */}
      <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} />
    </div>
  );
}

export default DashboardPage;
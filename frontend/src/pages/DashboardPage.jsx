// frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm'; // 1. Importe o TaskForm

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
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    };
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
    navigate('/login');
  };

  // 2. Função para adicionar a nova tarefa à lista existente
  const handleTaskCreated = (newTask) => {
    setTasks(currentTasks => [newTask, ...currentTasks]);
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>ZettaTask - Seu Dashboard</h1>
        <button onClick={handleLogout}>Sair</button>
      </header>

      <hr />

      {/* 3. Renderize o formulário e passe a função para ele */}
      <TaskForm onTaskCreated={handleTaskCreated} />

      <h2>Minhas Tarefas</h2>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default DashboardPage;
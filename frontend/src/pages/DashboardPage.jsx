// frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskList from '../components/TaskList'; // Importe o novo componente

function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas

  // useEffect para buscar as tarefas quando o componente for montado
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
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
    navigate('/login');
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>ZettaTask - Seu Dashboard</h1>
        <button onClick={handleLogout}>Sair</button>
      </header>

      <hr />

      <h2>Minhas Tarefas</h2>
      <TaskList tasks={tasks} /> {/* Renderiza o componente da lista de tarefas */}
    </div>
  );
}

export default DashboardPage;
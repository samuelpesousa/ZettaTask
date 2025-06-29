// frontend/src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove o token do localStorage
    localStorage.removeItem('token');
    // 2. Remove o cabeçalho de autorização do Axios
    delete api.defaults.headers.Authorization;
    // 3. Redireciona para a página de login
    navigate('/login');
  };

  return (
    <div>
      <h1>ZettaTask - Seu Dashboard</h1>
      <p>Bem-vindo! Aqui você gerenciará suas tarefas.</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default DashboardPage;
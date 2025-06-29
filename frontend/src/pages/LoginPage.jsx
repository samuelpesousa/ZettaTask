// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 1. Importe o 'Link'
import api from '../services/api';
import styles from './Auth.module.css'; // Importa os estilos

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, senha });
      const { token } = response.data;

      localStorage.setItem('token', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      
      alert('Login realizado com sucesso!');
      navigate('/');

    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Verifique seu email e senha.');
    }
  };

  return (
    <div className="container">
      <h1><span style={{ color: '#007bff' }}>Zetta</span>Task - Acessar Conta</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      
      {/* 2. Adicione o link para a página de cadastro */}
      <div className={styles.secondaryAction}>
        <p>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './Auth.module.css';

function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    try {
      // Chama a API de cadastro
      await api.post('/users/register', { nome, email, senha });

      alert('Usuário cadastrado com sucesso!');

      // Redireciona para a página de login
      navigate('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao cadastrar. Verifique o console para mais detalhes.');
    }
  };

  return (
    

        <div className="container"> {/* Use a classe global */}
<h1><span style={{ color: '#007bff' }}>Zetta</span>Task - Criar Conta</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
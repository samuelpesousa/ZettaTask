import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Chama a API de login
      const response = await api.post('/users/login', { email, senha });
      
      // 2. Pega o token da resposta
      const { token } = response.data;

      // 3. Armazena o token no Local Storage do navegador
      localStorage.setItem('token', token);

      // 4. Configura o Axios para enviar o token em todas as futuras requisições
      api.defaults.headers.Authorization = `Bearer ${token}`;
      
      alert('Login realizado com sucesso!');
      
      // 5. Redireciona o usuário para o Dashboard (página principal)
      navigate('/');

    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Verifique seu email e senha.');
    }
  };

  return (
    <div>
      <h1>ZettaTask - Acessar sua Conta</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default LoginPage;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import api from './services/api.js'; // 1. Importe o 'api'

// 2. Verifique o token ao carregar a aplicação
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
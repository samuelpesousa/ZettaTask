import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não há token, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se há um token, renderiza a página solicitada
  return children;
}

export default ProtectedRoute;
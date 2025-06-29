// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'; // 1. Importe a LoginPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>ZettaTask</h1>} />
        <Route path="/login" element={<LoginPage />} /> {/* 2. Atualize esta rota */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
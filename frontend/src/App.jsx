// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Vamos criar essas páginas em breve
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/" element={<DashboardPage />} /> */}
        <Route path="/" element={<h1>Página Inicial</h1>} />
        <Route path="/login" element={<h1>Página de Login</h1>} />
        <Route path="/register" element={<h1>Página de Cadastro</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
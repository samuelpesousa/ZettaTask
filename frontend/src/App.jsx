// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importe a nova página
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>ZettaTask</h1>} />
        <Route path="/login" element={<h1>Página de Login</h1>} />
        {/* Atualize esta linha */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
// backend/index.js

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); // 1. Importe as rotas de tarefas

const app = express();
const port = 3001;

app.use(express.json());

// Rotas de Usuário
app.use('/users', userRoutes);

// Rotas de Tarefas (protegidas)
app.use('/tasks', taskRoutes); // 2. Use as rotas de tarefas

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
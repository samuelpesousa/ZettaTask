// backend/index.js

const express = require('express');
const cors = require('cors'); // 1. Importe o pacote cors
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 3001;

app.use(cors()); // 2. Diga ao Express para usar o cors
app.use(express.json());


// Rotas de Usuário
app.use('/users', userRoutes);

// Rotas de Tarefas (protegidas)
app.use('/tasks', taskRoutes); // 2. Use as rotas de tarefas

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
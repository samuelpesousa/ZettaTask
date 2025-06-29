
const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuário

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Tarefas funcionando!');
});

// Usa as rotas de usuário para qualquer requisição que comece com /users
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
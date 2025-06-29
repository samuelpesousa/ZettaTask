// backend/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController'); // Importe o controller

// Aplica o middleware de autenticação a todas as rotas de tarefas
router.use(authMiddleware);

// Rota para criar uma nova tarefa
router.post('/', taskController.create); // Use a função 'create' do controller

module.exports = router;
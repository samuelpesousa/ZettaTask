// backend/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController'); // Importe o controller

// Aplica o middleware de autenticação a todas as rotas de tarefas
router.use(authMiddleware);

// Rota para criar uma nova tarefa [cite: 14]
router.post('/', taskController.create); 

// Nova rota para listar as tarefas do usuário
router.get('/', taskController.list);

// Rota para criar uma nova tarefa
router.post('/', taskController.create);

// Rota para listar as tarefas do usuário
router.get('/', taskController.list);

// Nova rota para atualizar uma tarefa específica
router.put('/:id', taskController.update);


module.exports = router;
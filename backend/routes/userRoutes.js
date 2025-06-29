// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para registrar um novo usuário
router.post('/register', userController.register);

// Nova rota para login de usuário
router.post('/login', userController.login);

module.exports = router;
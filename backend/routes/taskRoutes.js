const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Este middleware será aplicado a TODAS as rotas definidas neste arquivo
router.use(authMiddleware);

// Rota para criar uma nova tarefa
router.post('/', (req, res) => {
    // Acessamos o ID do usuário que foi anexado pelo middleware
    res.send({ ok: true, user: req.userId });
});


module.exports = router;
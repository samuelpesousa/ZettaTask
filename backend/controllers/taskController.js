// backend/controllers/taskController.js

const { Tarefa } = require('../models');

exports.create = async (req, res) => {
  try {
    // Pegamos o nome e a descrição do corpo da requisição.
    const { nome, descricao } = req.body;
    // O status padrão de uma nova tarefa é 'pendente'.
    const status = 'pendente'; 
    // O ID do usuário vem do middleware de autenticação.
    const UsuarioId = req.userId; 

    // Criamos a tarefa no banco de dados, associando ao usuário.
    const novaTarefa = await Tarefa.create({
      nome,
      descricao,
      status,
      UsuarioId,
    });

    res.status(201).send(novaTarefa);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao criar tarefa', error: error.message });
  }
};
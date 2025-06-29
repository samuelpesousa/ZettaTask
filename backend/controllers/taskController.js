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
      nome, //
      descricao, //
      status, //
      UsuarioId,
    });

    res.status(201).send(novaTarefa);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao criar tarefa', error: error.message });
  }
};

// Nova função para listar tarefas
exports.list = async (req, res) => {
  try {
    const UsuarioId = req.userId; // ID do usuário vindo do middleware
    const { status } = req.query; // Pega o status do filtro da URL (ex: /tasks?status=pendente)

    const whereClause = { UsuarioId }; // Cláusula base: sempre filtra pelo usuário logado

    // Se um status for fornecido na URL, adiciona ao filtro
    if (status) {
      whereClause.status = status;
    }

    // Busca todas as tarefas no banco de dados com base no filtro
    const tarefas = await Tarefa.findAll({ where: whereClause });

    res.status(200).send(tarefas);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao listar tarefas', error: error.message });
  }
};

// Nova função para atualizar uma tarefa
exports.update = async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID da tarefa da URL
    const { nome, descricao, status } = req.body; // Pega os novos dados do corpo da requisição
    const UsuarioId = req.userId; // Pega o ID do usuário do token

    // O 'update' do Sequelize retorna um array com o número de linhas afetadas.
    const [numLinhasAfetadas] = await Tarefa.update(
      { nome, descricao, status },
      // Cláusula 'where' para garantir que o usuário só possa atualizar sua própria tarefa
      { where: { id, UsuarioId } }
    );

    if (numLinhasAfetadas === 0) {
      return res.status(404).send({ message: 'Tarefa não encontrada ou não pertence ao usuário.' });
    }

    // Se a atualização foi bem-sucedida, busca a tarefa atualizada para retorná-la
    const tarefaAtualizada = await Tarefa.findByPk(id);
    res.status(200).send(tarefaAtualizada);

  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar tarefa', error: error.message });
  }
};
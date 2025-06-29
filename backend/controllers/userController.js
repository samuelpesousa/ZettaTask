// backend/controllers/userController.js
const jwt = require('jsonwebtoken');

const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Criptografa a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 8);

    // Cria o usuário no banco de dados
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
    });

    res.status(201).send({
      message: 'Usuário cadastrado com sucesso!',
      usuario: { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email },
    });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
};
// Substiua sua função de login por esta
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Verificar se o usuário existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    // 2. Verificar se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).send({ message: 'Senha inválida.' });
    }

    // 3. Gerar o token JWT
    // Usando um segredo de texto simples para garantir que funcione
    const token = jwt.sign({ id: usuario.id }, 'seu_segredo_jwt_super_secreto', {
      expiresIn: '8h', // Token expira em 8 horas
    });

    res.status(200).send({
      message: 'Login realizado com sucesso!',
      token: token,
    });
  } catch (error) {
    // Adicionamos um console.log para ver o erro no terminal
    console.error('ERRO NO LOGIN:', error); 
    res.status(500).send({ message: 'Erro ao fazer login', error: error.message });
  }
};
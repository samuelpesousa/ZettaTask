const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Pega o token do cabeçalho da requisição
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'Nenhum token foi fornecido' });
  }

  // O token vem no formato "Bearer <token>". Precisamos separar as duas partes.
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Erro no formato do token' });
  }

  const [scheme, token] = parts;

  // Verifica se o início do token é "Bearer"
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token mal formatado' });
  }

  // 2. Valida o token
  jwt.verify(token, 'seu_segredo_jwt_super_secreto', (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }

    // 3. Se o token for válido, anexa o ID do usuário na requisição
    req.userId = decoded.id;
    return next(); // Chama a próxima função/controller na fila
  });
};
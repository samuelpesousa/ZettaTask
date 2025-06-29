// backend/config/config.js
require('dotenv').config(); // Carrega as variáveis do arquivo .env

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  test: {
    // ... configurações de teste se necessário
  },
  production: {
    // ... configurações de produção se necessário
  }
};
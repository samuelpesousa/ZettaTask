// backend/models/tarefa.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarefa extends Model {
    static associate(models) {
      // define association here
      // Adicione esta linha:
      Tarefa.belongsTo(models.Usuario, { foreignKey: 'UsuarioId' });
    }
  }
  Tarefa.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tarefa',
  });
  return Tarefa;
};
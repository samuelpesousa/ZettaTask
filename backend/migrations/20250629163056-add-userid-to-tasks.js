'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tarefas', 'UsuarioId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Usuarios', // Nome da tabela de referência
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tarefas', 'UsuarioId');
  },
};
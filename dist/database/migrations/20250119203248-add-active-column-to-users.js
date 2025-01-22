"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Define como ativado por padrão
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'active');
  },
};

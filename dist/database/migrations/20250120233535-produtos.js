"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produtos', 'quantidade', {
        type: Sequelize.INTEGER,
        allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('produtos', 'quantidade');
  },
};

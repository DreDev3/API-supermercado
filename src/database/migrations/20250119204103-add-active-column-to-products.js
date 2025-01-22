module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produtos', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Produtos ativos por padrão
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('produtos', 'active');
  },
};

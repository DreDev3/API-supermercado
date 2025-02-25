module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('produtos', {
       id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
       },
       nome: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       descricao: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       categoria: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
       },
       preco: {
        type: Sequelize.FLOAT,
        allowNull: false,
       },
       created_at: {
        type: Sequelize.DATE,
        allowNull: false,
       },
       updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
       }
      });

  },

  async down(queryInterface) {

    await queryInterface.dropTable('produtos');

  }
};

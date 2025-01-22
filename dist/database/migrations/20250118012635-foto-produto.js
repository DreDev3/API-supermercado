"use strict";module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      produto_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'produtos',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',//CASCADE faz com que oque acontecer na tabela principal, também aconteça com a tabela referenciada(nesse caso, ao atualizar o id na tabela aluno, o id na coluna aluno_id também será alterado)
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

    await queryInterface.dropTable('fotos');

  }
};

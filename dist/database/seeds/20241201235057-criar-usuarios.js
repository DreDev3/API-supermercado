"use strict";const bcryptjs = require('bcryptjs');
module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
      'users',// nome da tabela onde será inseridos os dados no bd
      [
        {
          nome: 'Carlos',
          email: 'car@testeg.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          nome: 'George',
          email: 'geg@testeg.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          nome: 'Fernanda',
          email: 'fefe@testeg.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        //comando para inserir no banco a partir do terminal utilizando o sequelize
        //npx sequelize db:seed:all
      ],
      {}),


  down: () => {

  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.createTable('privacies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      privacy: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
      
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('privacies');
  }
};

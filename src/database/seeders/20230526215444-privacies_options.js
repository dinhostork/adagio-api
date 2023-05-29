'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('privacies', [
      {
        id: 1,
        privacy: 'public',
      },
      {
        id: 2,
        privacy: 'private',
      },
      {
        id: 3,
        privacy: 'friends',
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('privacies', null, {});
  }
};

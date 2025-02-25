'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CuratedLists', [
      {
        name: 'Horror Movies',
        slug: 'horror-movies',
        description: 'A collection of the best horror films.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Action Movies',
        slug: 'action-movies',
        description: 'A curated list of top action films.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CuratedLists', null, {});
  },
};

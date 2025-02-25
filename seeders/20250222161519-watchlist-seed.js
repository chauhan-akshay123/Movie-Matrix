'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Assuming movie IDs 1 and 3 exist from Movies seeder
    await queryInterface.bulkInsert('Watchlists', [
      {
        movieId: 1,
        addedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 3,
        addedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Watchlists', null, {});
  },
};

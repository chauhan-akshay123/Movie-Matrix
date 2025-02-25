'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Assuming movie IDs 2 and 3 exist from Movies seeder
    await queryInterface.bulkInsert('Wishlists', [
      {
        movieId: 2,
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
    await queryInterface.bulkDelete('Wishlists', null, {});
  },
};

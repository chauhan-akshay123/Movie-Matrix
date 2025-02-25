'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        movieId: 1,
        rating: 9.0,
        reviewText: 'A timeless classic!',
        addedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 2,
        rating: 9.5,
        reviewText: 'Ledger stole the show!',
        addedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movieId: 3,
        rating: 8.5,
        reviewText: 'Mind-bending experience!',
        addedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};

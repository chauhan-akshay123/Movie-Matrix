'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Assuming CuratedLists have IDs 1 and 2 from curatedlist-seed and Movies from movie-seed
    await queryInterface.bulkInsert('CuratedListItems', [
      {
        curatedListId: 1, // Horror Movies
        movieId: 2,       // The Dark Knight
        addedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        curatedListId: 1, // Horror Movies
        movieId: 3,       // Inception
        addedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        curatedListId: 2, // Action Movies
        movieId: 1,       // The Shawshank Redemption
        addedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CuratedListItems', null, {});
  },
};

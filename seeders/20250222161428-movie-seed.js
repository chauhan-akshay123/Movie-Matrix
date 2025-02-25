'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Movies', [
      {
        title: 'The Shawshank Redemption',
        omdbId: 'tt0111161',
        genre: 'Drama',
        actors: 'Tim Robbins, Morgan Freeman, Bob Gunton',
        releaseYear: 1994,
        rating: 9.3,
        description: 'Two imprisoned men bond over a number of years...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'The Dark Knight',
        omdbId: 'tt0468569',
        genre: 'Action, Crime, Drama',
        actors: 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine',
        releaseYear: 2008,
        rating: 9.0,
        description: 'Batman raises the stakes in his war on crime...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Inception',
        omdbId: 'tt1375666',
        genre: 'Action, Adventure, Sci-Fi',
        actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
        releaseYear: 2010,
        rating: 8.8,
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  },
};

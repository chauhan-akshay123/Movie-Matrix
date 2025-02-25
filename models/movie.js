/**
 * models/movie.js
 */
module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define(
      'Movie',
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        omdbId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        genre: {
          type: DataTypes.TEXT,
        },
        actors: {
          type: DataTypes.TEXT,
        },
        releaseYear: {
          type: DataTypes.INTEGER,
        },
        rating: {
          type: DataTypes.FLOAT,
        },
        description: {
          type: DataTypes.TEXT,
        },
      },
      {
        timestamps: true,
      }
    );
  
    // Associations
    Movie.associate = (models) => {
      Movie.hasMany(models.Review, { foreignKey: 'movieId' });
      Movie.hasMany(models.Watchlist, { foreignKey: 'movieId' });
      Movie.hasMany(models.Wishlist, { foreignKey: 'movieId' });
      Movie.hasMany(models.CuratedListItem, { foreignKey: 'movieId' });
    };
  
    return Movie;
  };
  
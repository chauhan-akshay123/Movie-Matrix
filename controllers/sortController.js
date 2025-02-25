const { Op,col } = require("sequelize");
const db = require("../models");

const sortMoviesInList = async (req, res) => {
    const { list, sortBy, order } = req.query;
    
    // Validate required parameters
    if (!list || !sortBy) {
      return res.status(400).json({ error: "list and sortBy query parameters are required." });
    }
    
    // Determine sort order: default to ASC if not provided or invalid.
    const sortOrder = (order && order.toUpperCase() === "DESC") ? "DESC" : "ASC";
    
    try {
      let movies = [];
      
      // Sorting for different lists:
      if (list.toLowerCase() === "watchlist") {
        // Join Watchlist with Movies
        movies = await db.Movie.findAll({
          include: [{
            model: db.Watchlist,
            required: true,
            attributes: []  // no need to return watchlist-specific fields
          }],
          order: [[sortBy, sortOrder]]
        });
      } else if (list.toLowerCase() === "wishlist") {
        movies = await db.Movie.findAll({
          include: [{
            model: db.Wishlist,
            required: true,
            attributes: []
          }],
          order: [[sortBy, sortOrder]]
        });
      } else if (list.toLowerCase() === "curatedlist") {
        // For curated lists, we assume a join table CuratedListItem exists.
        movies = await db.Movie.findAll({
          include: [{
            model: db.CuratedListItem,
            required: true,
            attributes: []
          }],
          order: [[sortBy, sortOrder]]
        });
      } else {
        return res.status(400).json({ error: "Invalid list parameter. Use watchlist, wishlist, or curatedlist." });
      }
      
      // Map the movies to the desired format
      const formattedMovies = movies.map(movie => ({
        title: movie.title,
        omdbId: movie.omdbId, 
        genre: movie.genre,
        actors: movie.actors,
        releaseYear: movie.releaseYear,
        rating: movie.rating
      }));
      
      return res.json({ movies: formattedMovies });
    } catch (error) {
      console.error("Error in sortMoviesInList:", error.message);
      return res.status(500).json({ error: error.message });
    }
  };

  module.exports = { sortMoviesInList };
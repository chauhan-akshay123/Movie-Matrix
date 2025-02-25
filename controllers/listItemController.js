const { movieExistsInDB, fetchMovieAndCastDetails } = require("../services/movieService");
const Movie = require("../models/movie");
const db = require("../models");
const Watchlist = require("../models/watchlist");
const Wishlist = require("../models/wishlist");

const addToWatchlist = async (req, res) => {
    const { movieId } = req.body;
    if(!movieId){
        return res.status(400).json({ error: "movieId is required." });
    }
    try{
      let movie = await movieExistsInDB(movieId);
      console.log("Found movie:", movie);
      if(!movie){
         const movieData = await fetchMovieAndCastDetails(movieId);
         movie = await db.Movie.create(movieData);
         console.log("Created new movie:", movie);
      }
      console.log("Using movie id:", movie.id);
      if (!movie.id) {
        throw new Error("Movie record does not have an id!");
      }
      await db.Watchlist.create({ movieId: movie.id });
      return res.json({ message: "Movie added to watchlist successfully." });
    } catch(error){
        console.error("Error in addToWatclist:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

const addToWishlist = async (req, res) => {
    const { movieId } = req.body;
    if(!movieId) {
        return res.status(400).json({ error: "movieId is required." });
    }
    try{
      let movie = await movieExistsInDB(movieId);
      if(!movie) {
        let movieData = await fetchMovieAndCastDetails(movieId);
        movie = await db.Movie.create(movieData);
      }  
      await db.Wishlist.create({ movieId: movie.id });
      return res.json({ message: "Movie added to wishlist successfully." });
    } catch(error){
       console.error("Error in addToWishlist:", error.message);
       return res.status(500).json({ error: error.message }); 
    }
};

module.exports = { addToWatchlist, addToWishlist };
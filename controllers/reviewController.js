const Review = require("../models/review");
const Movie = require("../models/movie");
const db = require("../models");
const { movieExistsInDB } = require("../services/movieService");

const addReview = async (req, res) => {
    const { movieId } = req.params;
    const { rating, reviewText } = req.body;

    if(typeof rating !== "number" || rating < 0 || rating > 10){
        return res.status(400).json({ error: "Rating must be a number between 0 and 10." });
    }

    if(reviewText && reviewText.length > 500){
        return res.status(500).json({ error: "Review text cannot exceed 500 characters." });
    }
    try{
      let movie = await movieExistsInDB(movieId);  
      if(!movie) {
          return res.status(400).json({ error: "Movie not found." });
      }

      await db.Review.create({
        movieId: movie.id,
        rating,
        reviewText
      });

      return res.status(200).json({ message: "Review added successfully." });
    } catch(error){
        console.error("Error in addReview:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { addReview };
const Movie = require("../models/movie");
const Review = require("../models/review");
const { Op } = require("sequelize");
const db = require("../models");

const getTop5Movies = async (req, res) => {
    try {
      // Get the top 5 movies sorted by rating in descending order.
      // Note: Adjust sorting as needed. Here we assume rating is numeric.
      const topMovies = await db.Movie.findAll({
        order: [["rating", "DESC"]],
        limit: 5,
        include: [
          {
            model: db.Review,
            // If there are multiple reviews per movie, you could limit to one,
            // or sort by createdAt; here, we assume one review per movie.
            // For this example, we include all reviews.
          }
        ]
      });
  
      // Format the response
      const moviesResponse = topMovies.map((movie) => {
        // Choose one review if exists; for example, the first one.
        const reviewData = movie.Reviews && movie.Reviews.length > 0 ? movie.Reviews[0] : null;
        let reviewObj = null;
        if (reviewData) {
          // Calculate word count: split on whitespace, filter out empty strings.
          const wordCount = reviewData.reviewText ? reviewData.reviewText.trim().split(/\s+/).length : 0;
          reviewObj = {
            text: reviewData.reviewText,
            wordCount
          };
        }
        return {
          title: movie.title,
          rating: movie.rating,
          review: reviewObj
        };
      });
  
      return res.json({ movies: moviesResponse });
    } catch (error) {
      console.error("Error in getTop5Movies:", error.message);
      return res.status(500).json({ error: error.message });
    }
  };

  module.exports = { getTop5Movies };
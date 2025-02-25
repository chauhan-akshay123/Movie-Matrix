const { searchMovie } = require("../services/movieService");
const { Op, fn, col, where } = require("sequelize");
const db = require("../models");

const searchMovies = async (req, res) => {
    const { query } = req.query;
    if(!query) {
       return res.status(400).json({ error: `Query parameter is required.` }); 
    }

    try{
      const movies = await searchMovie(query);
      res.json({ movies });
    } catch(error){
       res.status(500).json({ error: error.message });
    }
};

/**
 * Search movies in the local Movies table based on genre and actor.
 * The search parameters are expected to be comma-separated strings.
 * This implementation uses a LIKE query on the genre and actors fields.
 */

const searchByGenreAndActor = async (req, res) => {
   let { genre, actor } = req.query;
   
   if (!genre && !actor) {
     return res.status(400).json({ message: "At least one search parameter (genre or actor) is required." });
   }
   
   // Trim the inputs to remove extra whitespace/newlines
   if (genre) genre = genre.trim();
   if (actor) actor = actor.trim();
   
   try {
     const conditions = [];
     if (genre) {
       conditions.push(
         where(fn('LOWER', col('genre')), {
           [Op.like]: `%${genre.toLowerCase()}%`
         })
       );
     }
     if (actor) {
       conditions.push(
         where(fn('LOWER', col('actors')), {
           [Op.like]: `%${actor.toLowerCase()}%`
         })
       );
     }
     
     console.log("Search conditions:", conditions);
 
     const movies = await db.Movie.findAll({
       where: conditions.length > 0 ? { [Op.and]: conditions } : {},
       order: [["createdAt", "DESC"]]
     });
 
     console.log("Found movies count:", movies.length);
     return res.status(200).json({ movies });
   } catch (error) {
     console.error("Error in searchByGenreAndActor:", error.message);
     return res.status(500).json({ error: error.message });
   }
 };

module.exports = { searchMovies, searchByGenreAndActor };
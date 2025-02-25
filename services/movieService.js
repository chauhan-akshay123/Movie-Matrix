const axiosInstance = require("../lib/axios");
const Movie = require("../models/movie");
require("dotenv").config();
const db = require("../models");

const searchMovie = async (query) => {
    try{
      // OMDb search endpoint: use "s" parameter for search term.
      const response = await axiosInstance.get("/", {
       params: { s: query }
      });
      
      // OMDb returns Search array if found
      const results = response.data.Search;

      if(!results) {
         throw new Error(response.data.Error || 'No movies found.');
      }
      
      // Fetch detailed information for each movie found
      const movies = await Promise.all(results.map(async (movie) => {
        const detailsResponse = await axiosInstance.get("/", {
         params: { i: movie.imdbID, plot: 'short' } // 'i' is the imdb id of the movie
        });
        
        const details = detailsResponse.data;

        return{
            title: details.Title,
            omdbId: details.imdbID,
            genre: details.Genre,
            actors: details.Actors,
            releaseYear: details.Year,
            rating: parseFloat(details.imdbRating),
            description: details.Plot
        };
      }));
      
      return movies;
    } catch(error){
       console.error('Error fetching movies from OMDB', error.message);
       throw new Error('Failed to fetch movies from OMDB.');
    }
};

const getActors = async (omdbId) => {
    try{
      const response = await axiosInstance.get("/", {
        params: { i: omdbId, plot: 'short' }
      });  
      return response.data.Actors || 'N/A';
    } catch(error){
        console.error(`Error fetching actors for movie ${omdbId}:`, error.message);
        return 'N/A';
    }
};

const movieExistsInDB = async (omdbId) => {
  const movie = await db.Movie.findOne({ where: { omdbId } });
  return movie;
};

const fetchMovieAndCastDetails = async (omdbId) => {
  try{
     const response = await axiosInstance.get("/", {
       params: { i: omdbId, plot: 'short' }
     });
     const details = response.data;
     if(details.Response === "false") {
        throw new Error(details.Error);
     }
     return{
        title: details.Title,
        omdbId: details.imdbID,
        genre: details.Genre,
        actors: details.Actors,
        releaseYear: details.Year,
        rating: parseFloat(details.imdbRating) || null,
        description: details.Plot
     };
  } catch(error){
     console.error("Error in fetchMoviAndCastDetails:", error.message);
     throw new Error("Failed to fetch movie details from OMDB.");
  }
};

module.exports = { searchMovie, getActors, fetchMovieAndCastDetails, movieExistsInDB };
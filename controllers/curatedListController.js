const CuratedList = require("../models/curatedList");
const db = require("../models");
const CuratedListItem = require("../models/curatedListItem");
const { movieExistsInDB, fetchMovieAndCastDetails } = require("../services/movieService");

// Function to generate a slug name from a name
const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const createCuratedList = async (req, res) => {
    try {
      const { name, description } = req.body;
  
      if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required." });
      }
  
      const slug = generateSlug(name);
  
      await db.CuratedList.create({ name, description, slug });
  
      return res.status(201).json({ message: "Curated list created successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

const updateCuratedList = async (req, res) => {
    try{
      const { curatedListId } = req.params; 
      const { name, description } = req.body;
      
      const curatedList = await db.CuratedList.findByPk(curatedListId);

      if(!curatedListId) {
        return res.status(400).json({ message: "Curated list not found." });
      }

      if(name) {
        curatedList.name = name;
      }
      if(description) {
         curatedList.description = description;
      }

      await curatedList.save();

      return res.status(200).json({ message: "Curated list updated successfully" });
    } catch(error){
       return res.status(500).json({ message: "Internal server error", error: error.message }); 
    }
};

const addToCuratedList = async (req, res) => {
  const { movieId, curatedListId } = req.body;
  if(!movieId || !curatedListId) {
     return res.status(400).json({ error: "movieId and curatedListId are required." }); 
  }
  try{
    let movie = await movieExistsInDB(movieId);
    if(!movie) {
       const movieData = await fetchMovieAndCastDetails(movieId);
       movie = await db.Movie.create(movieData);
    }
    const alreadyExists = await db.CuratedListItem.findOne({ where: { movieId: movie.id, curatedListId } });
    if(alreadyExists) {
      return res.status(400).json( { message: "Movie is already in the curated list." });
    }
    await db.CuratedListItem.create({ movieId: movie.id, curatedListId });
    return res.json({ message: "Movie added to curated list successfully." }); 
  } catch(error){
     console.error(" Error in addToCuratedList:", error.message);
     return res.status(500).json({ error: error.message });
  }
};

module.exports = { createCuratedList, updateCuratedList, addToCuratedList };


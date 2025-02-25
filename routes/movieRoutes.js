const express = require("express");
const { searchMovies,searchByGenreAndActor } = require("../controllers/movieController");
const { addToWatchlist, addToWishlist } = require("../controllers/listItemController");

const router = express.Router();

router.get("/search", searchMovies);

router.post("/watchlist", addToWatchlist);

router.post("/wishlist", addToWishlist);

router.get("/searchByGenreAndActor", searchByGenreAndActor);

module.exports = router;
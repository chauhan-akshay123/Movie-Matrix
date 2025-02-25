const express = require("express");
const router = express.Router();
const { sortMoviesInList } = require("../controllers/sortController");

router.get("/movies/sort", sortMoviesInList);

module.exports = router;
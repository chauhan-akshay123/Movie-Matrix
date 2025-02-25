const express = require("express");
const router = express.Router();
const { getTop5Movies } = require("../controllers/topMoviesController");

router.get("/movies/top5", getTop5Movies);

module.exports = router;
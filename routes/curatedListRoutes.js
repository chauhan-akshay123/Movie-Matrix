const express = require("express");
const router = express.Router();
const { createCuratedList, updateCuratedList, addToCuratedList } = require("../controllers/curatedListController");

router.post("/curated-lists", createCuratedList);
router.put("/curated-lists/:curatedListId", updateCuratedList);

// route to add a movie to a curated list
router.post("/movies/curated-list", addToCuratedList);

module.exports = router;
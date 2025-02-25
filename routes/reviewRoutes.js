const express = require("express");
const router = express.Router();
const { addReview } = require("../controllers/reviewController");

router.post("/movies/:movieId/reviews", addReview);

module.exports = router;
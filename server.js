const express = require("express");
require("dotenv").config();
const movieRoutes = require("./routes/movieRoutes");
const curatedListRoutes = require("./routes/curatedListRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const sortRoutes = require("./routes/sortRoutes");
const topMoviesRoutes = require("./routes/topMoviesRoutes");

const app = express();
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api", curatedListRoutes);
app.use("/api", reviewRoutes);
app.use("/api", sortRoutes);
app.use("/api", topMoviesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});


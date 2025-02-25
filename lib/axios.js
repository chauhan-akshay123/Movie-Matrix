const axios = require("axios");
require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: "http://www.omdbapi.com",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apikey: process.env.OMDB_API_KEY,
  },
});

module.exports = axiosInstance;

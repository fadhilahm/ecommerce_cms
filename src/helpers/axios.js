const axios = require("axios");

const hitScryfall = axios.create({
  baseURL: "https://api.scryfall.com"
});

const hitAPI = axios.create({
  baseURL: "http://localhost:3000"
});

// https://dry-sea-66434.herokuapp.com <--- e-commerce server
// http://localhost:3000 <--- localhost

module.exports = {
  hitScryfall,
  hitAPI
};

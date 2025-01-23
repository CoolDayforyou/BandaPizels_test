const { default: axios } = require("axios");

const client = axios.create({
  baseURL: "https://fakestoreapi.com",
});

module.exports = client;

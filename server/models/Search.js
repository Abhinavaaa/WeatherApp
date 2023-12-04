// models/search.js

const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  city: String,
  timestamp: { type: Date, default: Date.now },
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;

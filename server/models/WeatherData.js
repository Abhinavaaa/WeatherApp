const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  cityName: String,
  // Add other fields here as needed
});

module.exports = mongoose.model('WeatherData', weatherSchema);

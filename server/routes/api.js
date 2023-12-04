const express = require('express');
const router = express.Router();
const axios = require('axios');
const Search = require('../models/Search');

const API_KEY = 'd1845658f92b31c64bd94f06f7188c9c';

router.post('/search', async (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const weatherData = response.data;

    // Save the search to MongoDB
    const search = new Search({ city });
    await search.save();

    return res.json(weatherData);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching weather data' });
  }
});

router.get('/searches', async (req, res) => {
  try {
    // Retrieve the 5 most recent searches from the database
    const searches = await Search.find().sort({ timestamp: -1 }).limit(5);
    return res.json(searches);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching searches' });
  }
});

module.exports = router;

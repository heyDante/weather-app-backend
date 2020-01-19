require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();

// To make sure we use client's ip address
app.set('trust proxy', true);

app.use(express.static('build'));

// console.log(app);
app.get('/api/weather', (req, res) => {
  const DARK_SKY_KEY = process.env.DARK_SKY_KEY;
  const IPINFO_KEY = process.env.IPINFO_KEY;

  (async () => {
    const location = await axios.get(`https://ipinfo.io/${req.ip}?token=${IPINFO_KEY}`);
    const weatherData = await axios.get(`https://api.darksky.net/forecast/${DARK_SKY_KEY}/${location.data.loc}?exclude=minutely,hourly,daily,alerts,flags&units=ca`);
    res.send(weatherData.data);
  })();
});

module.exports = app;
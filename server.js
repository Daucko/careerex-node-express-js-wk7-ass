require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DATABASE_URI;

mongoose.connect(MONGO_URI).then(() => {
  console.log('MongoDB Connected...');
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
});

app.use(express.json());

// For request that contains only domain name and no API endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/api/items', require('./routes/items'));

// For routes other than the defined ones, send a 404 page
app.all(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', '404.html'));
});

require('dotenv').config();

const express = require('express');
const auth = require('./auth');
const movie = require('./movie');
const sequelize = require('./database');
const app = express();

// Middleware - Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/auth', auth);
app.use('/v1/movie', movie);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(process.env.PORT || 3000, () => console.log(`Server is running on port ${process.env.PORT || 3000}`));

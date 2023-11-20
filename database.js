const { Sequelize } = require('sequelize');
const {
  postgres: {
    url,
    username,
    password,
    database,
    port,
    dialectOptions
  },
  sequelize: {
    dialect
  }
} = require('./config');

// Create Sequelize instance
const sequelize = new Sequelize(database, username, password, {
  logging: console.log,
  host: url,
  port,
  dialect,
  dialectOptions
});

// sequelize.sync({ force: false }) // Set force to true to drop existing tables
// .then(() => {
//   console.log('Database & tables synchronized');
// })
// .catch((error) => {
//   console.error('Error synchronizing database:', error);
// });

// Export the Sequelize instance to be used in other parts of your application
module.exports = sequelize;
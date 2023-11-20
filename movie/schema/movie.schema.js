const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cast: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lastUpdatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  timestamps: true, // Enable timestamps (createdAt and updatedAt)
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Movie;
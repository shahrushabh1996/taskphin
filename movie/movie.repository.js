const Movie = require('./schema/movie.schema');
const { plainRows, plainRow } = require('../utils/sequelize');

async function createMovie(data) {
  try {
    const newMovie = await Movie.create(data);
    return plainRow(newMovie);
  } catch (err) {
    console.error('Error creating movie:', err);
    throw new Error(err);
  }
}

async function editMovie(where, data) {
  try {
    const [rowsAffected, [updatedMovie]] = await Movie.update(data, {
      where: where,
      returning: true // To get the updated record as a result
    });

    return {
      rowsAffected,
      updatedMovie: plainRow(updatedMovie)
    };
  } catch (err) {
    console.error('Error editing movie:', err);
    throw new Error(err);
  }
}

async function getMovies() {
  try {
    const movies = await Movie.findAll();

    return plainRows(movies)
  } catch (err) {
    console.error('Error getting movies:', err);
    throw new Error(err);
  }
}

async function deleteMovie(id) {
  try {
    const deletedMovie = await Movie.destroy({
      where: { id },
      returning: true
    });

    return deletedMovie;
  } catch (err) {
    console.error('Error deleting movie:', err);
    throw new Error(err);
  }
}

module.exports = {
    createMovie,
    editMovie,
    getMovies,
    deleteMovie
};
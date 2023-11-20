const movie = require('./movie.repository');
const {
  MOVIE_CREATED,
  MOVIE_NOT_FOUND,
  MOVIE_UPDATED,
  MOVIE_DELETED,
  MOVIE_FETCHED,
  MOVIE_CREATION_FAILED,
  MOVIE_UPDATION_FAILED,
  MOVIE_DELETION_FAILED,
  MOVIE_FETCHING_FAILED
} = require('./message.json');

async function create({
  data,
  userId
}) {
  try {
    const {
      name,
      rating,
      cast,
      genre,
      releaseDate
    } = data || {};

    const createdMovie = await movie.createMovie({
      name,
      rating,
      cast,
      genre,
      releaseDate,
      createdBy: userId
    })

    if (!createdMovie) throw new Error(MOVIE_CREATION_FAILED);

    return {
      code: 201,
      message: MOVIE_CREATED,
      data: createdMovie
    };
  } catch (err) {
    console.error('Error Creating Movie:', err);
    throw new Error(err);
  }
}

async function edit({
  where, 
  data,
  userId
}) {
  try {
    const {
      name,
      rating,
      cast,
      genre,
      releaseDate
    } = data || {};

    const updatedMovieData = await movie.editMovie(where, {
      name,
      rating,
      cast,
      genre,
      releaseDate,
      lastUpdatedBy: userId
    });

    if (!updatedMovieData) throw new Error(MOVIE_UPDATION_FAILED);

    const { rowsAffected, updatedMovie } = updatedMovieData;

    if (rowsAffected === 0) return {
      code: 404,
      message: MOVIE_NOT_FOUND
    }

    return {
      code: 200,
      message: MOVIE_UPDATED,
      data: updatedMovie
    }
  } catch (err) {
    console.error('Error Editing Movie:', err);
    throw new Error(err);
  }
}

async function deleteMovie(id) {
  try {
    const deletedMovie = await movie.deleteMovie(id);

    if (deletedMovie === 0) return {
      code: 404,
      message: "Movie not found"
    }
    else if (!deletedMovie) throw new Error(MOVIE_DELETION_FAILED)

    return {
      code: 204,
      message: MOVIE_DELETED
    }
  } catch (err) {
    console.error('Error Deleting Movie:', err);
    throw new Error(err);
  }
}

async function getAllMovies() {
  try {
    const movies = await movie.getMovies();

    if (!movies) throw new Error(MOVIE_FETCHING_FAILED);

    return {
      code: 200,
      message: MOVIE_FETCHED,
      data: movies
    }
  } catch (err) {
    console.error('Error Getting Movies:', err);
    throw new Error(err);
  }
}

module.exports = {
  create,
  edit,
  deleteMovie,
  getAllMovies
};

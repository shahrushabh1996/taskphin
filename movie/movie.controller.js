const movie = require('./movie.service');

async function create(req, res) {
  try {
    const { userData: { id: userId } } = req.headers;

    const { code, message, data } = await movie.create({
      data: req.body,
      userId
    });

    res.status(code).send({
      message, 
      data
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function edit(req, res) {
  try {
    const { userData: { id: userId } } = req.headers;

    const { id } = req.params;

    const { code, message, data } = await movie.edit({
      where: { id }, 
      data: req.body,
      userId
    });

    res.status(code).send({
      message, 
      data
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function deleteMovie(req, res) {
  try {
    const { id } = req.params;

    const { code, message, data } = await movie.deleteMovie(id);

    res.status(code).send({
      message, 
      data
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function getAllMovies(req, res) {
  try {
    const { code, message, data } = await movie.getAllMovies();

    res.status(code).send({
      message, 
      data
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
    create,
    edit,
    deleteMovie,
    getAllMovies
}
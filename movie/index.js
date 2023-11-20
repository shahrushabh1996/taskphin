const {
    create,
    edit,
    deleteMovie,
    getAllMovies
} = require('./movie.controller');
const { verifyAuthToken } = require('../middleware/auth.middleware')
const express = require('express');
const router = express.Router();

router.get('/', verifyAuthToken, getAllMovies);
router.post('/', verifyAuthToken, create);
router.put('/:id', verifyAuthToken, edit);
router.delete('/:id', verifyAuthToken, deleteMovie);

module.exports = router;
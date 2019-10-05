const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Movie = require('../models/Movie');

// GET /
//@desc Get all movies
router.get('/', auth, async (req: any, res: any) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /:id
//@desc Get movie by id
router.get('/:id', auth, async (req: any, res: any) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export {};
module.exports = router;

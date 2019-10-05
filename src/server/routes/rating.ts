const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Rating = require('../models/Rating');

//@route GET /rating/:id
//@desc Get rating of user
//@access Private
router.get('/:id', auth, async (req: any, res: any) => {
    try {
        const rating = await Rating.find({ movieId: req.params.id });
        res.json(rating);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST /tickets
//@desc Add new tickets
//@access Private
router.post(
    '/',
    [
        auth,
        [
            check('rating', 'Name is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req: any, res: any) => {
        const { rating, movieId } = req.body;
        try {
            const newRating = new Rating({
                rating,
                movieId,
                userId: req.user.id,
            });

            const rating1 = await newRating.save();
            res.json(rating1);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
);

export {};

module.exports = router;

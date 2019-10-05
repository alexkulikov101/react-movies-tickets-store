const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Screening = require('../models/Screening');

// GET /:id
//@desc Get screening by id
router.get('/:id', auth, async (req: any, res: any) => {
    try {
        const screening = await Screening.findById(req.params.id);

        res.json(screening);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT /:id
//@desc Update screening data by id
router.put('/:id', auth, async (req: any, res: any) => {
    //when I delete ticket I clean data in database about this ticket
    const row = req.body.row;
    const seat = req.body.seat;
    if (row && seat) {
        const { seats } = await Screening.findById(req.params.id);

        for (let i = 0; i < seats.length; i++) {
            if (seats[i].row === row && seats[i].seat === seat) {
                seats[i].isOccupied = false;
                seats[i].userId = '';
            }
        }
        const result = await Screening.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    seats: seats,
                },
            },
            { new: true },
        );

        if (!result) return res.status(400).send('No screening exists under given ID.');

        res.json(result);
    } else {
        const { seats } = await Screening.findById(req.params.id);
        const selectedSeats = req.body.selectedSeats;

        for (let i = 0; i < seats.length; i++) {
            selectedSeats.map((item: any) => {
                if (seats[i].row === item[0] && seats[i].seat === item[1]) {
                    seats[i].isOccupied = req.body.isOccupied;
                    seats[i].userId = req.body.isOccupied ? req.user : '';
                }
            });
        }

        const result = await Screening.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    seats: seats,
                },
            },
            { new: true },
        );

        if (!result) return res.status(400).send('No screening exists under given ID.');

        res.json(result);
    }
});

export {};

module.exports = router;

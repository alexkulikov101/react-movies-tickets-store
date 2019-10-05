const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');

//@route GET /tickets
//@desc Get all users tickets
//@access Private
router.get('/', auth, async (req: any, res: any) => {
    try {
        //const tickets = await Ticket.find();
        const tickets = await Ticket.find({ user: req.user.id }).sort({ date: -1 });
        res.json(tickets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route POST /tickets
//@desc Add new tickets
//@access Private

router.post('/', auth, async (req: any, res: any) => {
    const { img, name, date, time, row, seat, screeningId } = req.body;
    try {
        const newTicket = new Ticket({
            img,
            name,
            date,
            time,
            row,
            seat,
            screeningId,
            user: req.user.id,
        });

        const ticket = await newTicket.save();
        res.json(ticket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route DELETE /tickets
//@desc Delete ticket
//@access Private
router.delete('/:id', auth, async (req: any, res: any) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

        // Make sure user owns ticket
        if (ticket.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
        await Ticket.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Ticket removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export {};

module.exports = router;

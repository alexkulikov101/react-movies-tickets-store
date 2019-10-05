const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    row: {
        type: String,
        required: true,
    },
    seat: {
        type: String,
        required: true,
    },
    screeningId: {
        type: String,
        required: true,
    },
    dateOfCreation: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('ticket', TicketSchema);

export {};

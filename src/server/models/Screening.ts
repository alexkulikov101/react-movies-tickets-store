const mongoose = require('mongoose');

const ScreeningSchema = mongoose.Schema({
    screeningRoomId: {
        type: String,
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },

    seats: [],
});
module.exports = mongoose.model('screening', ScreeningSchema);

export {};

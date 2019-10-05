const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    threed: {
        type: Boolean,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    screenings: {
        type: Array,
    },
});
module.exports = mongoose.model('movie', MovieSchema);

export {};

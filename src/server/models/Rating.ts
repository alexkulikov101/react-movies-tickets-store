const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    rating: {
        type: String,
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});
module.exports = mongoose.model('rating', RatingSchema);

export {};

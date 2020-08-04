const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true},
    description: { type: String, required: true }
}, {
    timestamps: true,
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
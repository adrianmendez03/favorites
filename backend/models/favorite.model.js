const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, requires: true},
    location: { type: String, required: true }
}, {
    timestamps: true,
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
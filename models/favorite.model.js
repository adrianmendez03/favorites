const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    _id: String,
    coord: { type: Array, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true, unique: true },
    description: { type: String},
    fans: [{
        type: mongoose.Schema.Types.String,
        ref: 'User'
    }]
}, {
    timestamps: true,
});

favoriteSchema.plugin(uniqueValidator);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
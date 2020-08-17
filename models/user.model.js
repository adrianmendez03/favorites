const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    coord: { type: Array, required: true},
    name: { type: String, required: true },
    location: { type: String, required: true},
    description: { type: String, required: true}
}, {
    timestamps: true,
});

const userSchema = new Schema({
    _id: String,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    favorites: [favoriteSchema]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
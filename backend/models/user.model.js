const mongoose = require('mongoose');
const favoriteSchema = require('./favorite.model').schema;

const Schema = mongoose.Schema;

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
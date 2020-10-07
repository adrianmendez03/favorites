const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String,
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    favorites: [{
        type: mongoose.Schema.Types.String,
        ref: 'Favorite'
    }]
}, {
    timestamps: true,
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
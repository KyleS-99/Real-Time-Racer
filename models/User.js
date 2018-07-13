const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    first: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    img: String,
    races: [{
        title: String,
        wpm: Number,
        opponent: {
            first: String,
            last: String,
            wpm: Number,
            img: String
        }
    }]
});

// Create model
const User = mongoose.model('user', userSchema);

// Export model
module.exports = User;
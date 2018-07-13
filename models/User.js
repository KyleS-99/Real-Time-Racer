const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    first: {
        type: String,
        required: true
    },
    last: {
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

userSchema.pre('save', async function(next) {
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Generate hashed password (salt + hash)
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // set plain-text password to hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

// Create model
const User = mongoose.model('user', userSchema);

// Export model
module.exports = User;
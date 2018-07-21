const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    method: {
        type: String,
        enum: ["local", "google", "facebook"],
        required: true
    },
    local: {
        first: {
            type: String
        },
        last: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        },
        img: String,
        races: [{
            first: String,
            last: String,
            img: String,
            text: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'texts'
            },
            wpm: Number,
            accuracy: Number,
            opponent: {
                first: String,
                last: String,
                wpm: Number,
                img: String
            }
        }]
    },
    google: {
        id: {
            type: String
        },
        first: {
            type: String
        },
        last: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        img: String,
        races: [{
            first: String,
            last: String,
            img: String,
            text: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'texts'
            },
            wpm: Number,
            accuracy: Number,
            opponent: {
                first: String,
                last: String,
                wpm: Number,
                img: String
            }
        }]
    },
    facebook: {
        id: {
            type: String
        },
        first: {
            type: String
        },
        last: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        img: String,
        races: [{
            first: String,
            last: String,
            img: String,
            text: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'texts'
            },
            wpm: Number,
            accuracy: Number,
            opponent: {
                first: String,
                last: String,
                wpm: Number,
                img: String
            }
        }]
    }
});

userSchema.pre('save', async function(next) {
    try {
        if (this.method !== 'local') {
            next();
        }

        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Generate hashed password (salt + hash)
        const hashedPassword = await bcrypt.hash(this.local.password, salt);

        // set plain-text password to hashed password
        this.local.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
};

// Create model
const User = mongoose.model('user', userSchema);

// Export model
module.exports = User;
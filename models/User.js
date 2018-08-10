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
        playerRaces: [{
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
        }],
        practiceRaces: [{
            text: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'texts'
            },
            wpm: Number,
            accuracy: Number
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
        playerRaces: [{
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
        }],
        practiceRaces: [{
            text: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'texts'
            },
            wpm: Number,
            accuracy: Number
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
        playerRaces: [{
            first: String,
            last: String,
            img: String,
            text: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'passages'
            },
            wpm: Number,
            accuracy: Number,
            opponent: {
                first: String,
                last: String,
                wpm: Number,
                img: String
            }
        }],
        practiceRaces: [{
            text: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'texts'
            },
            wpm: Number,
            accuracy: Number
        }]
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
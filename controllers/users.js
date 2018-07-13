const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/keys');

const signToken = user => {
    // Create token
    return `bearer ${JWT.sign({
        iss: 'Real Time Racer',
        id: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time but 1 day ahead
    }, secret)}`;
};

module.exports = {
    signUp: async (req, res, next) => {
        const { first, last, email, password, password2 } = req.value.body;

        // Check if user already exists with entered email
        const foundUser = await User.findOne({ email });

        // Respond with status 403 with error message if user found with that email
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new User({ first, last, email, password });
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);

        // Respond with token
        res.json({ token });
    },
    signIn: async (req, res, next) => {
        // Generate Token

    },
    secret: async (req, res, next) => {
        console.log('secret route called', req.user);
    }
};
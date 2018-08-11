const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/keys');
const bcrypt = require('bcryptjs');

const signToken = user => {
    if (user[user.method].password) {
        const { email, first, last, races } = user[user.method]
        user[user.method] = {
            email,
            first,
            last, 
            races
        }
    }

    // Create token
    return `bearer ${JWT.sign({
        id: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1), // current time but 1 day ahead
        method: user.method,
        user: user[user.method]
    }, secret)}`;
};

module.exports = {
    signUp: async (req, res) => {
        const { first, last, email, password } = req.value.body;

        // Check if user already exists with entered email
        const foundUser = await User.findOne({ 'local.email': email });

        // Respond with status 403 with error message if user found with that email
        if (foundUser) {
            return res.status(403).json({ email: 'Email is already in use' });
        }

        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Generate hashed password (salt + hash)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({ method: 'local', local: { first, last, email, password: hashedPassword } });
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);

        // Respond with token
        res.json({ token });
    },
    signIn: async (req, res) => {
        const { email, password } = req.body;

        // Find the user given the email
        const user = await User.findOne({ 'local.email': email });

        // Not found
        if (!user) {
            return res.status(404).json({ loginEmail: 'No user found' });
        }

        const isMatch = await user.isValidPassword(password);

        // Check if password does not match
        if (!isMatch) {
            return res.status(400).json({ loginPassword: 'Password incorrect' });
        }

        // Generate token
        const token = signToken(user);

        // Send back user and token
        res.json({ token });
    },
    generateOAuthToken:  async (req, res) => {
        // Set user and generate token
        const { user } = req;
        const token = signToken(user);

        // Send user data and token back to user
        res.json({ token });
    }
};
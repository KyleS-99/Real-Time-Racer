const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/keys');

const signToken = user => {
    // Create token
    return `bearer ${JWT.sign({
        id: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time but 1 day ahead
    }, secret)}`;
};

module.exports = {
    signUp: async (req, res) => {
        const { first, last, email, password, password2 } = req.value.body;

        // Check if user already exists with entered email
        const foundUser = await User.findOne({ 'local.email': email });

        // Respond with status 403 with error message if user found with that email
        if (foundUser) {
            return res.status(403).json({ email: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new User({ method: 'local', local: { first, last, email, password } });
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);

        // Respond with token
        res.json({ method: newUser.method, user: newUser.local, token });
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
        res.json({ method: user.method, user: user.local, token });
    },
    generateOAuthToken:  async (req, res) => {
        // Set user and generate token
        const { user } = req;
        const token = signToken(user);

        // Send user data and token back to user
        res.json({ method: user.method, user: user[user.method], token });
    },
    secret: async (req, res) => {
        res.json({ message: "You're an authenticated user"});
        console.log('secret route called', req.user);
    }
};
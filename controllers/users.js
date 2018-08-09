const JWT = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/keys');

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
    },
    practice: async (req, res) => {
        // Get user data
        const { grossWPM, acc, passageId } = req.body;

        // Find user by id
        const user = await User.findById(req.user.id);

        // Update users practiceRaces array
        user[user.method].practiceRaces.unshift({
            text: passageId,
            wpm: grossWPM,
            accuracy: acc
        });

        // Save new race data to database
        await user.save();

        // Send race data back to client
        res.json({ raceId: user[user.method].practiceRaces[0].id });
    }
};
const User = require('../models/User');

module.exports = {
    practice: async (req, res) => {
        // Get user data
        const { grossWPM, acc, passageId } = req.body;
        // Get user off of req object
        const { user } = req;

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
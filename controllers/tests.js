const User = require('../models/User');

module.exports = {
    practice: async (req, res) => {
        // Get user data
        const { grossWPM, acc, passageId } = req.body;

        // Update users practiceRaces array
        req.user[req.user.method].practiceRaces.unshift({
            text: passageId,
            wpm: grossWPM,
            accuracy: acc
        });

        // Save new race data to database
        await req.user.save();

        // Send race data back to client
        res.json({ raceId: req.user[req.user.method].practiceRaces[0].id });
    }
};
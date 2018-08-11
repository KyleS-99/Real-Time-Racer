const User = require('../models/User');
const Passage = require('../models/Passage');

module.exports = {
    practice: async (req, res) => {
        // Get user data
        const { grossWPM, acc, passageId } = req.body;
        // Get user off of req object
        const { user } = req;

        // Update users practiceRaces array
        user[user.method].practiceRaces.unshift({
            passage: passageId,
            wpm: grossWPM,
            accuracy: acc
        });

        // Save new race data to database
        await user.save();

        // Send race data back to client
        res.json({ raceId: user[user.method].practiceRaces[0].id });
    },
    practiceResult: async (req, res) => {
        const { user } = req;
        const raceFound = 
            user[user.method]
            .practiceRaces
            .filter((race) => race._id === req.params.raceId);
        
        // If no race found
        if (raceFound.length === 0) {
            return res.status(404).json({ error: "No race with this ID." });
        }

        // Get passageId
        const passageId = raceFound[0].passage;

        // race was found, now fetch the passage that was typed
        const passage = await Passage.findById(passageId);

        // Send back to client
        console.log(passage);
    }
};
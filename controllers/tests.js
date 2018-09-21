const User = require('../models/User');
const Passage = require('../models/Passage');

const calcHighAvgLow = (user, wpm) => {
    // Initialize variables
    let statsObj = {};
    const userInMethod = user[user.method];

    // Check to see if it's their first race
    if (userInMethod.practiceRaces.length === 1) {
        userInMethod.high = wpm;
        userInMethod.low = wpm;
    }

    // Check to see if it's a new high score for the user
    if (userInMethod.high < wpm) {
        userInMethod.high = wpm;
    }

    // Check to see if it's the slowest they've typed
    if (userInMethod.low > wpm) {
        userInMethod.low = wpm;
    }

    // Calculate the average
    const avg = userInMethod.practiceRaces.reduce((a, b) => {
        return a + b.wpm;
    }, 0) / userInMethod.practiceRaces.length;

    userInMethod.avg = Math.round(avg);

    return user;
};

module.exports = {
    practice: async (req, res) => {
        // Get user data
        const { grossWPM, acc, passageId } = req.body;
        // Get user off of req object
        let { user } = req;

        // Update users practiceRaces array
        user[user.method].practiceRaces.unshift({
            passage: passageId,
            wpm: grossWPM,
            accuracy: acc
        });

        // Calculate high avg and low
        user = calcHighAvgLow(user, grossWPM);

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
            .filter((race) => (race._id).toString() === req.params.raceId);
        
        // If no race found
        if (raceFound.length === 0) {
            return res.status(404).json({ error: "No race with this ID." });
        }

        // Get passageId
        const { passage: passageId } = raceFound[0];

        // race was found, now fetch the passage that was typed
        const passageDocument = await Passage.findById(passageId);

        // Data to send back
        const { passage, _id: id } = passageDocument;
        const { wpm, accuracy } = raceFound[0];
        
        // Send back to client
        res.json({
            passage,
            wpm,
            accuracy,
            id
        });
    },
    all: async (req, res) => {
        // Set user variable
        const { user } = req;
        // Get query parameters
        const { type = 'all', start = 0 } = req.query;

        if (type === 'all') {
            // Merge the 2 arrays
            const merged = [...user[user.method].practiceRaces, ...user[user.method].playerRaces];
            const all = merged.slice(start, start + 15);
            const { low, avg, high } = user[user.method];
            const done = merged.length === 0 || all === merged;

            // send back data
            res.json({
                allRaces: all.length >= 15 ? all : merged.slice(0, 15),
                total: merged.length,
                practiceTotal: user[user.method].practiceRaces.length,
                playerTotal: user[user.method].playerRaces.length,
                low,
                avg,
                high,
                done
            });
        } else if (type === 'practice') {
            // Get practice races
            const practiceRaces = user[user.method].practiceRaces.slice(start, start + 15);
            const done = practiceRaces.length === 0 || practiceRaces === user[user.method].practiceRaces.length;    

            // Send back to client
            res.json({
                practiceRaces: practiceRaces.length > 0 ? practiceRaces : user[user.method].practiceRaces.slice(0, 15),
                done
            });
        } else if (type === 'player') {
            // Get player races
            const playerRaces = user[user.method].playerRaces.slice(start, start + 15);
            const done = playerRaces.length === 0 || playerRaces === user[user.method].playerRaces.length;

            // Send back to client
            res.json({
                playerRaces: playerRaces.length > 0 ? playerRaces : user[user.method].playerRaces.slice(0, 15),
                done
            });
        }
    }
};
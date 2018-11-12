const User = require('../models/User');
const Passage = require('../models/Passage');

const calcHighAvgLow = (user, wpm) => {
    // Check to see if it's their first race
    if (user[user.method].practiceRaces.length === 1 && user[user.method].playerRaces.length === 1) {
        user[user.method].high = wpm;
        user[user.method].low = wpm;
    }

    // Check to see if it's a new high score for the user
    if (user[user.method].high < wpm) {
        user[user.method].high = wpm;
    }

    // Check to see if it's the slowest they've typed
    if (user[user.method].low > wpm) {
        user[user.method].low = wpm;
    }

    // Calculate the average
    const practiceAvg = user[user.method].practiceRaces.length > 0 ? user[user.method].practiceRaces.reduce((a, b) => {
        return a + b.wpm;
    }, 0) / user[user.method].practiceRaces.length : 0;

    const playerAvg = user[user.method].playerRaces.length > 0 ? user[user.method].playerRaces.reduce((a, b) => {
        return a + b.wpm;
    }, 0) / user[user.method].playerRaces.length : 0;

    user[user.method].avg = Math.round(practiceAvg + playerAvg);

    return user;
};

const sendBack = (data) => data.length > 0;

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

        // Calculate high, avg, and low
        user = calcHighAvgLow(user, grossWPM);

        // Save new race data to database
        await user.save();

        // Send race data back to client
        res.json({ raceId: user[user.method].practiceRaces[0].id });
    },
    multiplayer: async (req, res) => {
        // Get user data
        const { grossWPM, acc, passageId } = req.body;
        // Get user off of req object
        let { user } = req;

        // Update users playerRaces array
        user[user.method].playerRaces.unshift({
            passage: passageId,
            wpm: grossWPM,
            accuracy: acc
        });

        // Calculate high, avg, and low
        user = calcHighAvgLow(user, grossWPM);

        // Save new race data to database
        await user.save();

        // Send race data back to client
        res.json({ raceId: user[user.method].playerRaces[0].id });
    },
    practiceResult: async (req, res) => {
        const { user } = req;
        const practiceRaceFound = 
            user[user.method]
            .practiceRaces
            .filter((race) => (race._id).toString() === req.params.raceId);
        const multiplayerRaceFound = 
            user[user.method]
            .playerRaces
            .filter((race) => (race._id).toString() === req.params.raceId);
        
        // If no race found
        if (practiceRaceFound.length === 0 && multiplayerRaceFound.length === 0) {
            return res.status(404).json({ error: "No race with this ID." });
        }

        // Get passageId
        const { passage: passageId } = practiceRaceFound.length === 0 ? multiplayerRaceFound[0] : practiceRaceFound[0];

        // race was found, now fetch the passage that was typed
        const passageDocument = await Passage.findById(passageId);

        // Data to send back
        const { passage, _id: id } = passageDocument;
        const { wpm, accuracy } = practiceRaceFound.length === 0 ? multiplayerRaceFound[0] : practiceRaceFound[0];
        
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
            const done = !sendBack(all);

            // send back data
            res.json({
                allRaces: sendBack(all) ? all : [],
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
            const done = !sendBack(practiceRaces);    

            // Send back to client
            res.json({
                practiceRaces: sendBack(practiceRaces) ? practiceRaces : [],
                done
            });
        } else if (type === 'player') {
            // Get player races
            const playerRaces = user[user.method].playerRaces.slice(start, start + 15);
            const done = !sendBack(playerRaces);

            // Send back to client
            res.json({
                playerRaces: sendBack(playerRaces) ? playerRaces : [],
                done
            });
        }
    }
};
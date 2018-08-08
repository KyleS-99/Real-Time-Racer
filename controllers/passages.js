const Passage = require('../models/Passage');

module.exports = {
    getRandomPassage: async (req, res) => {
        const { passage, id } = await Passage.random();

        res.json({ passage, id });
    }
};
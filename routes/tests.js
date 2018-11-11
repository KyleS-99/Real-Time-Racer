const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });
const {
    practice,
    multiplayer,
    practiceResult,
    all
} = require('../controllers/tests');

// @route   POST /tests/practice
// @desc    Saves practice race data
// @access  Private
router.post('/practice', passportJWT, practice);

// @route   POST /tests/multiplayer
// @desc    Saves multiplayer race data
// @access  Private
router.post('/multiplayer', passportJWT, multiplayer);

// @route   GET /tests/practice/:raceId
// @desc    Grabs a race from the practice array matching id
// @access  Private
router.get('/practice/:raceId', passportJWT, practiceResult);

// @route   GET /tests/all
// @desc    Grab all tests
// @access  Private
router.get('/all', passportJWT, all);

module.exports = router;
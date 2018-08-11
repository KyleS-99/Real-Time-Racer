const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });
const { practice, practiceResult } = require('../controllers/tests');

// @route   POST /tests/practice
// @desc    Saves practice race data
// @access  Private
router.post('/practice', passportJWT, practice);

// @route   GET /tests/practice/:raceId
// @desc    Grabs a race from the practice array matching id
// @access  Private
router.get('/practice/:raceId', passportJWT, practiceResult);

module.exports = router;
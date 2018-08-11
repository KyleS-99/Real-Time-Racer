const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false });
const { practice } = require('../controllers/tests');

// @route   POST /users/practice
// @desc    Saves practice race data
// @access  Private
router.post('/practice', passportJWT, practice);

module.exports = router;
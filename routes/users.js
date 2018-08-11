const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const { registerBody, loginBody } = require('../helpers/routeHelpers');
const { signIn, signUp, generateOAuthToken } = require('../controllers/users');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });

// @route   POST /users/signup
// @desc    Sign user up
// @access  Public
router.post('/signup', registerBody(), signUp);

// @route   POST /users/login
// @desc    Log the user in
// @access  Public
router.post('/login', loginBody(), signIn);

// @route   POST /users/oauth/google
// @desc    Sign user up using google OAuth
// @access  Public
router.post('/oauth/google', passportGoogle, generateOAuthToken);

// @route   POST /users/oauth/facebook
// @desc    Sign user up using facebook OAuth
// @access  Public
router.post('/oauth/facebook', passportFacebook, generateOAuthToken);

module.exports = router;
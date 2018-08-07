const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const { registerBody, loginBody } = require('../helpers/routeHelpers');
const { signIn, signUp, generateOAuthToken, practice } = require('../controllers/users');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });

router.post('/signup', registerBody(), signUp);

router.post('/login', loginBody(), signIn);

router.post('/practice', passportJWT, practice);

router.post('/oauth/google', passportGoogle, generateOAuthToken);

router.post('/oauth/facebook', passportFacebook, generateOAuthToken);

module.exports = router;
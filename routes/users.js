const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');

const { registerBody, loginBody } = require('../helpers/routeHelpers');
const { signIn, signUp, secret } = require('../controllers/users');
const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/signup', registerBody(), signUp);

router.post('/login', loginBody(), signIn);

router.get('/secret', passportJWT, secret);

module.exports = router;
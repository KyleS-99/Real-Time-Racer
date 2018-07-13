const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');

const { registerBody } = require('../helpers/routeHelpers');
const { signIn, signUp, secret } = require('../controllers/users');

router.post('/signup', registerBody(), signUp);

router.post('/signin', signIn);

router.get('/secret', passport.authenticate('jwt', { session: false }), secret);

module.exports = router;
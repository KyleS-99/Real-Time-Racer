const router = require('express-promise-router')();

const { registerBody } = require('../helpers/routeHelpers');
const { signIn, signUp, secret } = require('../controllers/users');

router.post('/signup', registerBody(), signUp);

router.post('/signin', signIn);

router.post('/secret', secret);

module.exports = router;
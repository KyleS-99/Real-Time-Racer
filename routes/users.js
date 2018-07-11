const router = require('express-promise-router')();

const { signIn, signUp, secret } = require('../controllers/users');

router.post('/signup', signUp);

router.post('/signin', signIn);

router.post('/secret', secret);

module.exports = router;
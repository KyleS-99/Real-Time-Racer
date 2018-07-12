const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers');
const { signIn, signUp, secret } = require('../controllers/users');

router.post('/signup', validateBody(schemas.authSchema), signUp);

router.post('/signin', signIn);

router.post('/secret', secret);

module.exports = router;
const router = require('express-promise-router')();

const { getRandomPassage } = require('../controllers/passages');

router.get('/random', getRandomPassage);

module.exports = router;
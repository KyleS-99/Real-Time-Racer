const router = require('express').Router();

// @route 
// @desc 
// @access Public
router.post('/login', (req, res) => {
    res.send('loggin in with google');
});

// @route 
// @desc 
// @access Public
router.post('/logout', (req, res) => {
    res.send('loggin in with google');
});

// @route 
// @desc 
// @access Public
router.post('/google', (req, res) => {
    res.send('loggin in with google');
});

module.exports = router;
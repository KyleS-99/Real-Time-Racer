const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { google: { clientID, clientSecret } } = require('./keys');

passport.use(
    new GoogleStrategy({
        // Options for new google strategy
        clientID,
        clientSecret
    }, () => {
        // passport callback function
    })
);
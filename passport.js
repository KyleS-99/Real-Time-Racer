const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const { secret, google: { clientID, clientSecret }, facebook: { appID, appSecret } } = require('./config/keys');
const User = require('./models/User');

// JWT Strategy
passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
        secretOrKey: secret
    }, async (payload, done) => {
        try {
            // Find user specified in token
            const user = await User.findById(payload.id);

            // if user doesn't exist
            if (!user) {
                return done(null, false);
            }

            // return the user
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    })
);

// Google OAuth Strategy
passport.use(
    'googleToken',
    new GooglePlusTokenStrategy({
        clientID,
        clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists
            const existingUser = await User.findOne({ "google.id": profile.id });

            // Already existing user
            if (existingUser) {
                return done(null, existingUser);
            }

            // If new account
            const newUser = new User({
                method: 'google',
                google: {
                    id: profile.id,
                    email: profile.emails[0].value,
                    first: profile.name.givenName,
                    last: profile.name.familyName,
                    img: profile._json.image.url
                }
            });

            // Save new user
            await newUser.save();

            // pass new user to controller
            done(null, newUser);
        } catch (error) {
            done(error, false, error.message);
        }
    })
);

// Facebook OAuth Strategy
passport.use(
    'facebookToken',
    new FacebookTokenStrategy({
        clientID: appID,
        clientSecret: appSecret
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists in database
            const existingUser = await User.findOne({ 'facebook.id': profile.id });

            // Already existing user
            if (existingUser) {
                return done(null, existingUser);
            }

            // If new user - create new user
            const newUser = new User({
                method: 'facebook',
                facebook: {
                    id: profile.id,
                    email: profile._json.email,
                    first: profile._json.first_name,
                    last: profile._json.last_name,
                    img: profile.photos[0].value
                }
            });

            // Save new user
            await newUser.save();

            // pass new user to controller
            done(null, newUser);
        } catch (error) {
            done(error, false, error.message)
        }
    })
);
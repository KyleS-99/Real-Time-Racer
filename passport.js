const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { secret } = require('./config/keys');
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

// Local Strategy
// passport.use(
//     new LocalStrategy({
//         usernameField: 'email'
//     }, async (email, password, done) => {
//         // Find the user given the email
//         const user = await User.findOne({ email });

//         // Not found
//         if (!user) {
//             return done(null, false);
//         }

//         // Check if password is correct
//     })
// );
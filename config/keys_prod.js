module.exports = {
    mongoURI: process.env.MONGO_URI,
    secret: process.env.SECRET,
    google: {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    },
    facebook: {
        appID: process.env.FACEBOOK_ID,
        appSecret: process.env.FACEBOOK_SECRET
    }
};
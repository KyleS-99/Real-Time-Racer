const User = require('../models/User');

module.exports = {
    signUp: async (req, res, next) => {
        console.log('UsersController.signUp() called!');

        const { first, last, email, password, password2 } = req.value.body;

        
    },
    signIn: async (req, res, next) => {
        console.log('UsersController.signIn() called!')
    },
    secret: async (req, res, next) => {
        console.log('UsersController.secret() called!')
    }
};
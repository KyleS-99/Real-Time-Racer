module.exports = {
    signUp: (req, res, next) => {
        console.log('UsersController.signUp() called!')
    },
    signIn: (req, res, next) => {
        console.log('UsersController.signIn() called!')
    },
    secret: (req, res, next) => {
        console.log('UsersController.secret() called!')
    }
};
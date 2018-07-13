const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = {
    registerBody: () => {
        return (req, res, next) => {
            let errors = {};
            let { first, last, email, password, password2 } = req.body;

            first = !isEmpty(first) ? first : '';
            last = !isEmpty(last) ? last : '';
            email = !isEmpty(email) ? email : '';
            password = !isEmpty(password) ? password : '';
            password2 = !isEmpty(password2) ? password2 : '';

            // validate first
            if (!Validator.isLength(first, { min: 2, max: 30 })) {
                errors.first = 'First name must be between 2 and 30 characters';
            }

            if (Validator.isEmpty(first)) {
                errors.first = 'First name field is required';
            }

            // validate last
            if (!Validator.isLength(last, { min: 2, max: 30 })) {
                errors.last = 'Last name must be between 2 and 30 characters';
            }

            if (Validator.isEmpty(last)) {
                errors.last = 'Last name field is required';
            }
            
            // Email field validation            
            if (!Validator.isEmail(email)) {
                errors.email = 'Email is invalid';
            }

            if (Validator.isEmpty(email)) {
                errors.email = 'Email field is required';
            }

            // Password field validation
            if (!Validator.isLength(password, { min: 6, max: 30 })) {
                errors.password = 'Password must be between 6 and 30 characters';
            }

            if (Validator.isEmpty(password)) {
                errors.password = 'Password field is required';
            }

            // Password2 field validation
            if (Validator.isEmpty(password2)) {
                errors.password2 = 'Confirm password field is required';
            }

            if (!Validator.equals(password, password2)) {
                errors.password2 = 'Passwords must match';
            }

            // If there's errors send them back with a 400 status
            if (!isEmpty(errors)) {
                return res.status(400).json(errors);
            }

            // create req.value and set it equal to an empty object
            if (!req.value) { req.value = {}; }
            req.value['body'] = req.body;

            // call next because it passed our middleware
            next();
        }
    },
    loginBody: () => {
        return (req, res, next) => {
            let errors = {};
            let { email, password } = req.body;

            email = !isEmpty(email) ? email : '';
            password = !isEmpty(password) ? password : '';
    
            // Email field validation
            if (!Validator.isEmail(email)) {
                errors.email = 'Email is invalid';
            }
            
            if (Validator.isEmpty(email)) {
                errors.email = 'Email field is required';
            }
            
            // Password field validation
            if (Validator.isEmpty(password)) {
                errors.password = 'Password field is required';
            }

            // If there's errors return 400 and send back errors
            if (!isEmpty(errors)) {
                return res.status(400).json(errors);
            }

            // create req.value and set it equal to an empty object
            if (!req.value) { req.value = {}; }
            req.value['body'] = req.body;

            // call next because it passed our middleware
            next();
        }
    }
};
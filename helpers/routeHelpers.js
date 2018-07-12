const Joi = require('joi');

module.exports = {
	validateBody: (schema) => {
		return (req, res, next) => {
			const result = Joi.validate(req.body, schema);
			if (result.error) {
				const pathToKey = result.error.details[0].context.key;
				const customErrorMessage = {
					first: `First name ${result.error.details[0].message.slice(pathToKey.length+3)}`,
					last: `Last name ${result.error.details[0].message.slice(pathToKey.length+3)}`,
				};
				const customValue = customErrorMessage[pathToKey] || result.error.details[0].message;

				return res.status(400).json(customValue);
			}

			if (!req.value) { req.value = {}; }
			req.value['body'] = result.value;
			next();
		}
	},

  schemas: {
	authSchema: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required().min(6).max(40),
		password2: Joi.string().required().equal(),
		first: Joi.string().required().min(2).max(40),
		last: Joi.string().required().min(2).max(40),
	})
  }
}
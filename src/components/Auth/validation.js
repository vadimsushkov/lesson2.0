const Validation = require('../validation');
const Joi = require('@hapi/joi');

class AuthValidation extends Validation {
    signIn(params) {
        return this.Joi.object({
            email: this.Joi.string().email().required(),
        }).validate(params);
    }

    token(params) {
        return this.Joi.object({
            refreshToken: this.Joi.string().required(),
        }).validate(params);
    }

    signOut(params) {
        return this.Joi.object({
            email: this.Joi.string().email().required(),
        }).validate(params);
    }
}

module.exports = new AuthValidation();

const Joi = require('@hapi/joi');
const Validation = require('../validation');

class AuthValidation extends Validation {
    signIn(params) {
        return Joi.object({
            email: Joi.string().email().required(),
        }).validate(params);
    }

    signUp(params) {
        return Joi.object({
            email: Joi.string().email().required(),
        }).validate(params);
    }

    token(params) {
        return Joi.object({
            refreshToken: Joi.string().required(),
        }).validate(params);
    }

    signOut(params) {
        return Joi.object({
            email: Joi.string().email().required(),
        }).validate(params);
    }
}

module.exports = new AuthValidation();

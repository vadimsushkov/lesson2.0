const Joi = require('@hapi/joi');
const Validation = require('../validation');

class UsersValidation extends Validation {
    findById(params) {
        return this.customJoi.object({
            id: this.customJoi.objectId().required(),
        }).validate(params);
    }

    findByEmail(params) {
        return this.customJoi.object({
            email: this.customJoi.string().email().required(),
        }).validate(params);
    }

    create(params) {
        return Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        }).validate(params);
    }

    updateById(params) {
        return Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        }).validate(params);
    }

    deleteById(params) {
        return Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
        }).validate(params);
    }
}

module.exports = new UsersValidation();

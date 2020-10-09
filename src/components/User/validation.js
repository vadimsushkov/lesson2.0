const Joi = require('@hapi/joi');
const Validation = require('../validation');

class UsersValidation extends Validation {
    findById(params) {
        return this.customJoi.object({
            id: this.customJoi.objectId().required(),
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
        const schema = Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
        });
        return schema.validate(params);
    }
}

module.exports = new UsersValidation();

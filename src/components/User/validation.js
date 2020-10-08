const Joi = require('@hapi/joi');

class JoiValidate {
    static findById(params) {
        const schema = Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
        });
        return schema.validate(params);
    }

    static create(params) {
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        });
        return schema.validate(params);
    }

    static updateById(params) {
        const schema = Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .min(3)
                .max(30)
                .required(),
        });
        return schema.validate(params);
    }

    static deleteById(params) {
        const schema = Joi.object({
            id: Joi.string()
                .min(12)
                .required(),
        });
        return schema.validate(params);
    }
}

module.exports = JoiValidate;

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(422).json({
                message: 'Unauthorized',
                details: {},
            });
        }

        return jwt.verify(token, (error, data) => {
            if (error) {
                throw error;
            }

            return data;
        });
    } catch (error) {
        res.status(422).json({
            message: 'Unauthorized',
            details: {},
        });
        return next(error);
    }
};

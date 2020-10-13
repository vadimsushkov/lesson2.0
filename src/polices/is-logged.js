const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authToken = req.header('authorization');
    const token = authToken && authToken.split(' ')[1];
    console.log(token);

    if (!token) return res.status(401).json('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = verified;

        return next();
    } catch (error) {
        return res.status(403).json('token is expired');
    }
};

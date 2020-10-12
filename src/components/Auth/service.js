const UserModel = require('../User/model');
const jwt = require('jsonwebtoken');
const redis = require('../../config/redisConnection');

module.exports = {

    async signUp(profile) {
        UserModel.create(profile);
    },

    async relationIdToRefreshToken(userId, refreshToken) {
        redis.set(userId, refreshToken);
        redis.expire(refreshToken, 86400);
    },

    async updateExistingUserRefreshToken(userId, refreshToken) {
        return redis.set(userId, refreshToken);
    },

    async findUserByEmail(email) {
        return UserModel.findOne({ email }).exec();
    },

    async findRefreshTokenById(userId) {
        const RefreshToken = await redis.getAsync(userId);

        return RefreshToken;
    },

    async deleteRefreshTokenById(userId) {
        return redis.del(userId);
    },

    async deleteAllRefreshTokens() {
        return redis.flushall();
    },

    async generateTokens(payload, method) {
        const newPayload = { id: payload.id.toString(), email: payload.email };
        const accessToken = jwt.sign(newPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign(newPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        await method(payload.id, refreshToken);

        return res.status(200).json({
            data: {
                accessToken,
                refreshToken,
            },
        });
    },
};

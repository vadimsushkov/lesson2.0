const UserModel = require('./model');
const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const redisClient = require('../../config/redisConnection');

module.exports = {
    /**
     * @exports
     * @method findAll
     * @method createUser
     * @param {}
     * @summary get list of all users
     * @returns Promise<UserModel[]>
     */
    async findAll() {
        return await UserModel.find({});
    },

    /**
     * @exports
     * @method findById
     * @param {string} id
     * @summary get user by user
     * @returns Promise<UserModel[]>
     */
    async findById(id) {
        const foundUser = await UserModel.findOne({ id: Types.ObjectId(id) });

        return foundUser || null;
    },

    /**
    * @exports
    * @method create
    * @param {object} profile
    * @summary create a new user
    * @returns {Promise<UserModel>}
    */
    async create(profile) {
        return await UserModel.create(profile);
    },

    /**
    * Find a user by id and update his profile
    * @exports
    * @method updateById
    * @param {string} id
    * @param {object} newProfile
    * @summary update a user's profile
    * @returns {Promise<void>}
    */
    async updateById(id, newProfile) {
        return await UserModel.updateOne(
            { _id: Types.ObjectId(id) },
            {
                $set: newProfile,
            },
        ).exec();
    },

    /**
    * @exports
    * @method deleteById
    *  @param {string} id
    * @summary delete a user from database
    * @returns {Promise<void>}
    */
    async deleteById(id) {
        return await UserModel.deleteOne({ _id: Types.ObjectId(id) }).exec();
    },

    async findByEmail(email) {
        const foundUser = await UserModel.findOne({ email: Types.ObjectId(email) });

        return foundUser || null;
    },

    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '1m' });
        const refreshToken = jwt.sign(payload, process.env.YOUR_VARIABLE, { expiresIn: '7d' });

        await redisClient.set(refreshToken, payload.id, 'EX', 86400);

        return {
            accessToken,
            refreshToken,
        };
    },
};

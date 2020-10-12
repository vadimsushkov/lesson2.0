require('dotenv').config();

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
        const newUser = await UserModel.create(profile);

        return newUser || null;
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
        const updatedUser = await UserModel.updateOne(
            { _id: Types.ObjectId(id) },
            {
                $set: newProfile,
            },
        ).exec();
        return updatedUser || null;
    },

    /**
    * @exports
    * @method deleteById
    *  @param {string} id
    * @summary delete a user from database
    * @returns {Promise<void>}
    */
    async deleteById(id) {
        const foundUser = await UserModel.deleteOne({ _id: Types.ObjectId(id) }).exec();

        return foundUser || null;
    },

    async findByEmail(email) {
        const foundUser = await UserModel.findOne({ email: Types.ObjectId(email) });

        return foundUser || null;
    },

    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        await redisClient.set(refreshToken, payload.id, 'EX', 86400);

        return {
            accessToken,
            refreshToken,
        };
    },
};

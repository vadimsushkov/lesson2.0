const UserModel = require('./model');

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
        return await UserModel.findOne({ id });
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
                $set: newProfile
            }
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
    }
    };


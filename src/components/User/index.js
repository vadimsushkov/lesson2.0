const UserService = require('./service');
const UserValidation = require('./validation');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    const users = await UserService.findAll();

    return res.status(200).json({
        message: 'Users',
        data: users,
        statusCode: 200,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */

async function findById(req, res, next) {
    const { value, error } = UserValidation.findById(req.params);

    if (error) {
        throw error;
    }

    const user = await UserService.findById(value.id);
    console.log(value.id);
    console.log(user);
    if (!user) {
        return res.status(404).json({
            message: 'User is not found',
            statusCode: 404,
        });
    }
    return res.status(200).json({
        message: 'User successfully was found',
        data: user,
        statusCode: 200,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    const { value, error } = UserValidation.create(req.params);
    if (error) {
        throw error;
    }
    const user = await UserService.create(value);

    return res.status(200).json({
        message: 'User was successfully created',
        data: user,
        statusCode: 200,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    const { value, error } = UserValidation.updateById(req.body);
    if (error) {
        throw error;
    }
    const updatedUser = await UserService.updateById(value.id, {
        email: value.email,
    });

    if (!updatedUser) {
        return res.status(404).json({
            message: 'User is not found',
            statusCode: 404,
        });
    }

    return res.status(200).json({
        message: 'User was successfully updated',
        data: updatedUser,
        statusCode: 200,
    });
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    const { value, error } = UserValidation.deleteById(req.body);
    if (error) {
        throw error;
    }
    const deletedUser = await UserService.deleteById(value.id);

    if (!deletedUser) {
        return res.status(404).json({
            message: 'User is not found',
            statusCode: 404,
        });
    }

    return res.status(200).json({
        message: 'User was successfully deleted',
        data: deletedUser,
        statusCode: 200,
    });
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};

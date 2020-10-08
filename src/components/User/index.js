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

    res.status(200).json({
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
    const { error } = UserValidation.findById(req.params);
    const user = await UserService.findById(req.params.id);

    res.status(200).json({
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
    const { error } = UserValidation.create(req.body);
    const user = await UserService.create(req.body);

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
    const { error } = UserValidation.updateById(req.body);
    const updatedUser = await UserService.updateById(req.body.id, {
        email: req.body.email,
    });

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
    const { error } = UserValidation.deleteById(req.body);
    const deletedUser = await UserService.deleteById(req.body.id);

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

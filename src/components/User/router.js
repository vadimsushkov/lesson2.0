const { Router } = require('express');
const UserComponent = require('../User');
const exceptionsFilter = require('./filter');
const isLogged = require('../../polices/is-logged');
const jwt = require('jsonwebtoken');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', exceptionsFilter(UserComponent.findAll));

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/:id', [isLogged], exceptionsFilter(UserComponent.findById));

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', exceptionsFilter(UserComponent.create));

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', exceptionsFilter(UserComponent.updateById));

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', exceptionsFilter(UserComponent.deleteById));

/**
 * Route to auth
 * @name /v1/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', exceptionsFilter(UserComponent.authentication));

module.exports = router;

// jwt.sign(payload, accessTokenSecret, { expiresIn: number })
jwt.sign({
    data: user,
}, 'secret', { expiresIn: '1h' });
// jwt.sign(payload, refreshTokenSecret, { expiresIn: number })

// return tokens

// use access token for access to protected routes in your api and it'll be fine... go go go

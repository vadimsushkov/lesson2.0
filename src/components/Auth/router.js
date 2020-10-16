const { Router } = require('express');
const AuthComponent = require('../Auth');
const exceptionsFilter = require('./filter');

const router = Router();

/**
 * @swagger
 * /v1/auth/signUp:
 *  post:
 *    description: sign up user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: sign up body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            email: test.user@mail.com
 *    responses:
 *      200:
 *        description: user successfuly signed in
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Sign in successfull!!
 *      400:
 *        description: sign in failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: Email already exists
 */
router.post('/signUp', exceptionsFilter(AuthComponent.signUp));

/**
 * @swagger
 * /v1/auth/signIn:
 *  post:
 *    description: sign in user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: sign in body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            email: test.user@mail.com
 *    responses:
 *      200:
 *        description: user successfuly signed in
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Sign in successfull!!
 *      400:
 *        description: sign in failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: User is not found
 */
router.post('/signIn', exceptionsFilter(AuthComponent.signIn));

/**
 * @swagger
 * /v1/auth/currentUser:
 *  get:
 *    description: get a current user
 *    tags: ["auth"]
 *    requestBody:
 *      description: get user
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            accessToken: Bearer ea135929105c4f29a0f5117d2960926f
 *    responses:
 *      200:
 *        description: user successfuly signed in
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Sign in successfull!!
 *      400:
 *        description: sign in failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: User is not found
 */
router.get('/currentUser', exceptionsFilter(AuthComponent.currentUser));

/**
 * @swagger
 * /v1/auth/refreshToken:
 *  post:
 *    description: refresh token
 *    tags: ["auth"]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            refreshToken: Bearer ea135929105c4f29a0f5117d2960926f
 *    responses:
 *      200:
 *        description: user successfuly signed in
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Sign in successfull!!
 *      400:
 *        description: sign in failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: User is not found
 */
router.post('/refreshToken', exceptionsFilter(AuthComponent.refresh));

/**
 * @swagger
 * /v1/auth/signOut:
 *  delete:
 *    description: sign in user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: sign in body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *            email: test.user@mail.com
 *    responses:
 *      200:
 *        description: user successfuly signed in
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Sign in successfull!!
 *      400:
 *        description: sign in failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: User is not found
 */
router.delete('/signOut', exceptionsFilter(AuthComponent.signOut));

/**
 * @swagger
 * /v1/auth/signOutAll:
 *  delete:
 *    description: sign in user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: sign in body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSchema'
 *          example:
 *    responses:
 *      200:
 *        description: user successfuly signed in
 *        content:
 *          appication/json:
 *            example:
 *              status: 200
 *              logged: true
 *              message: Sign in successfull!!
 *      400:
 *        description: sign in failed
 *        content:
 *          application/json:
 *            example:
 *              status: 400
 *              logged: false
 *              message: User is not found
 */
router.delete('/signOutAll', AuthComponent.signOutAll);

module.exports = router;

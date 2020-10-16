const { Router } = require('express');
const AuthComponent = require('../Auth');
const exceptionsFilter = require('./filter');

const router = Router();

router.post('/signUp', exceptionsFilter(AuthComponent.signUp));

/**
 *
 * @swagger
 * /auth/signup/:
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
 *            password: test_test
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
router.post('/signIn', exceptionsFilter(AuthComponent.signIn));

router.get('/currentUser', exceptionsFilter(AuthComponent.currentUser));

router.post('/refreshToken', exceptionsFilter(AuthComponent.refresh));

router.delete('/signOut', exceptionsFilter(AuthComponent.signOut));

router.delete('/signOutAll', AuthComponent.signOutAll);

module.exports = router;

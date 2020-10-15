const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const AuthValidation = require('./validation');

/**
 *
 * @swagger
 * /signIn
 *  post:
 *      summary: sign in user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: email address
 *      responses:
 *          201:
 *              description: user signed in
 *          422:
 *              description: user already exists
 */

async function signIn(req, res) {
    const { value, error } = AuthValidation.signIn(req.body);

    if (error) throw error;

    const user = await AuthService.findUserByEmail(value.email);

    if (!user) return res.status(404).json({ message: 'User is not found', statusCode: 404 });
    const { accessToken, refreshToken } = await AuthService.generateTokens(
        user,
        AuthService.relationIdToRefreshToken,
    );
    return res.header('Authorization', accessToken).status(200).json({ data: { accessToken, refreshToken } });
}

async function refresh(req, res) {
    const { value, error } = AuthValidation.token(req.body);
    console.log(value);

    if (error) throw error;

    return jwt.verify(value.refreshToken, process.env.REFRESH_TOKEN_SECRET,
        async (err, payload) => {
            if (err) return res.sendStatus(403);

            const oldRefreshToken = await AuthService.findRefreshTokenById(payload.id);

            if (!oldRefreshToken) return res.status(400).json({ message: 'RefreshToken has been expired' });

            const { accessToken, refreshToken } = await (AuthService.generateTokens(
                payload,
                AuthService.updateExistingUserRefreshToken,
            ));

            return res.status(200).json({ data: { accessToken, refreshToken } });
        });
}

async function signOut(req, res) {
    const { value, error } = AuthValidation.signOut(req.body);
    console.log(req.body);

    if (error) throw error;

    const user = await AuthService.findUserByEmail(value.email);
    console.log(user);
    await AuthService.deleteRefreshTokenById(user.email.toString());

    return res.status(200).json({ message: 'You are signed out', data: null });
}

async function signUp(req, res) {
    const { error } = AuthValidation.signUp(req.body);

    if (error) throw error;

    const user = await AuthService.signUp(req.body);

    return res.status(200).json({ message: 'User has been created', data: { user } });
}

async function signOutAll(req, res) {
    await AuthService.deleteAllRefreshTokens();

    return res.status(200).json({ message: 'All users have been signed out' });
}

module.exports = {
    signIn,
    refresh,
    signOut,
    signUp,
    signOutAll,
};

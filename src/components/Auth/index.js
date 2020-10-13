const jwt = require('jsonwebtoken');
const AuthService = require('./service');
const AuthValidation = require('./validation');

async function signIn(req, res, next) {
    const { value, error } = AuthValidation.signIn(req.body);
    console.error(req.body);

    if (error) throw error;

    const user = await AuthService.findUserByEmail(value.email);
    console.error(user);

    if (!user) return res.status(404).json({ message: 'User is not found', statusCode: 404 });

    return res.status(200).json({ message: 'You are signed in', data: AuthService.generateTokens(user, AuthService.relationIdToRefreshToken) });
}

async function refresh(req, res, next) {
    const { value, error } = AuthValidation.token(req.body);

    if (error) throw error;

    return jwt.verify(value.refreshToken, process.env.REFRESH_TOKEN_SECRET,
        async (err, payload) => {
            if (err) return res.sendStatus(403);

            const oldRefreshToken = await AuthService.findRefreshTokenById(payload.id);

            if (!oldRefreshToken) return res.status(400).json({ message: 'RefreshToken has been expired' });

            return res.status(200).json(AuthService.generateTokens(payload,
                AuthService.updateExistingUserRefreshToken));
        });
}

async function signOut(req, res, next) {
    const { value, error } = AuthValidation.signOut(req.body);

    if (error) throw error;

    const userId = await AuthService.findUserByEmail(value.email);

    await AuthService.deleteRefreshTokenById(userId.id.toString());

    return res.status(200).json({ message: 'You are signed out', data: null });
}

async function signUp(req, res, next) {
    const { error } = AuthValidation.signUp(req.body);

    if (error) throw error;

    const user = await AuthService.signUp(req.body);

    return res.status(200).json({ message: 'User has been created', data: { user } });
}

async function signOutAll(req, res, next) {
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

const { Router } = require('express');
const AuthComponent = require('../Auth');
const exceptionsFilter = require('./filter');
const isLogged = require('../../polices/is-logged');

const router = Router();

router.post('/signUp', exceptionsFilter(AuthComponent.signUp));

router.post('/signIn', [isLogged], exceptionsFilter(AuthComponent.signIn));

router.post('/refreshToken', [isLogged], exceptionsFilter(AuthComponent.refresh));

router.delete('/signOut', [isLogged], exceptionsFilter(AuthComponent.signOut));

router.delete('/signOutAll', AuthComponent.signOutAll);

module.exports = router;

const express = require('express');
const http = require('http');
const UserRouter = require('../components/User/router');
const AuthRouter = require('../components/Auth/router');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        info: {
            title: 'Lesson 2',
            description: 'Swagger docs for API of lesson 2',
            version: '1.0.0',
        },
    },
    apis: ['../components/User/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();

        /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/users', UserRouter);
        app.use('/v1/auth', AuthRouter);
        app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res, next) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    },
};

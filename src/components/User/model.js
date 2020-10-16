const { Schema } = require('mongoose');
const connections = require('../../config/connection');

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *      properties:
 *        id:
 *          type: string
 *        email:
 *          type: string
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
    },
}, {
    collection: 'usermodel',
    versionKey: false,
});

module.exports = connections.model('UserModel', UserSchema);

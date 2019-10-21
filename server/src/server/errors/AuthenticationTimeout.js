const ApplicationError = require('./ApplicationError');
const { HTTP_CODE : {
    SERVER_ERROR: { AUTHENTICATION_TIMEOUT }
}} = require('../constants');

class AuthenticationTimeout extends ApplicationError {
    constructor(message) {
        super(message || AUTHENTICATION_TIMEOUT.TEXT, AUTHENTICATION_TIMEOUT.CODE);
    }
}
module.exports = AuthenticationTimeout;


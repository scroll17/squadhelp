const ApplicationError = require('./ApplicationError');
const { HTTP_CODE : {
    SERVER_ERROR: { FORBIDDEN }
}} = require('../constants');

class ForbiddenError extends ApplicationError {
    constructor(message) {
        super(message || FORBIDDEN.TEXT, FORBIDDEN.CODE);
    }
}
module.exports = ForbiddenError;

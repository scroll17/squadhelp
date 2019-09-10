const ApplicationError = require('./ApplicationError');
const { HTTP_CODE : {
    SERVER_ERROR: { CONFLICT }
}} = require('../constants');

class ConflictError extends ApplicationError {
    constructor(message) {
        super(message || CONFLICT.TEXT, CONFLICT.CODE);
    }
}
module.exports = ConflictError;

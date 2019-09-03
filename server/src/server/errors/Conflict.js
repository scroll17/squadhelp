const ApplicationError = require('./ApplicationError');
const { HTTP_CODE : {
    SERVER_ERROR: { CONFLICT }
}} = require('../utils/consts');

class ConflictError extends ApplicationError {
    constructor(message) {
        super(message || CONFLICT.TEXT, CONFLICT.CODE);
    }
}
module.exports = ConflictError;

const ApplicationError = require('./ApplicationError');
const { HTTP_CODE : {
    SERVER_ERROR: { REMOVED }
}} = require('../utils/consts');

class GoneError extends ApplicationError {
    constructor(message) {
        super(message || REMOVED.TEXT, REMOVED.CODE);
    }
}
module.exports = GoneError;

const ApplicationError = require('./ApplicationError');
const { HTTP_CODE : {
    SERVER_ERROR: { UNAUTHORIZED }
}} = require('../constants');

class Unauthorized extends ApplicationError {
    constructor(message) {
        super(message || UNAUTHORIZED.TEXT, UNAUTHORIZED.CODE);
    }
}
module.exports = Unauthorized;


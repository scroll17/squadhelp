const ApplicationError = require('./ApplicationError');
const { HTTP_CODE : {
    SERVER_ERROR: { BAD_REQUEST }
}} = require('../constants');

class BadRequest extends ApplicationError {
    constructor(message) {
        super(message || BAD_REQUEST.TEXT, BAD_REQUEST.CODE);
    }
}
module.exports = BadRequest;


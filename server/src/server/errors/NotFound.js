const ApplicationError = require('./ApplicationError');
const { HTTP_CODE : {
  SERVER_ERROR: { NOT_FOUND }
}} = require('../utils/consts');

class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message || NOT_FOUND.TEXT, NOT_FOUND.CODE);
  }
}
module.exports = NotFoundError;


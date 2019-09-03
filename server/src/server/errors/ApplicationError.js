const { HTTP_CODE : {
  SERVER_ERROR: { INTERNAL_SERVER_ERROR }
}} = require('../utils/consts');

class ApplicationError extends Error{
    constructor(message, status) {
      super();
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.message = message ||
          'Something went wrong. Please try again.';
      this.status = status || INTERNAL_SERVER_ERROR.CODE;
  }
}

module.exports = ApplicationError;

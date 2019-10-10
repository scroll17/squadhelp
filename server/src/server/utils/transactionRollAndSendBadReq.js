const {
    BadRequest
} = require("../errors/errors");

module.exports = async (transaction, next) => {
    await transaction.rollback();
    return next(new BadRequest());
};
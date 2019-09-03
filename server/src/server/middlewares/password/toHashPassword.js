const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require("../../utils/consts");

module.exports = async (req, res, next) => {
    const { body } = req;
    try {
        if (req.body.password) {
            req.body.hashPassword =  await bcrypt.hash(body.password, SALT_ROUNDS);
        }
        return next();
    } catch (e) {
        next(e);
    }

};

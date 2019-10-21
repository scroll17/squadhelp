const { BadRequest } = require("../../errors/errors");

module.exports = (req, res, next) => {
    const { paymentData, user } = req.body;

    if(paymentData.sum > user.balance){
        return next(new BadRequest())
    }else {
        return next()
    }
};

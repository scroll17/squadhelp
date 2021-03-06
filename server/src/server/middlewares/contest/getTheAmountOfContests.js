const { CONTEST_PRICE } = require('../../constants');

module.exports = (req, res, next) => {
        const { paymentData } = req.body;
        paymentData['sum'] =  paymentData.contests.reduce( (accumulator, value) => {
            return accumulator + CONTEST_PRICE.get(value)
        }, 0);
        delete paymentData["contests"];

        next()
};

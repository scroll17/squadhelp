const {
    CONTEST_PRICE,
} = require('../../constants');

const { BadRequest } = require("../../errors/errors");

const calculateThePriceForContests = require("../../utils/calculateThePriceForContests");


module.exports = (req, res, next) => {
    const { paymentData } = req.body;


    paymentData['sum'] = calculateThePriceForContests(CONTEST_PRICE, paymentData.contests);

    if(paymentData['sum']){

        delete paymentData["contests"];

        return next();

    }else {

        return next(new BadRequest())

    }

};

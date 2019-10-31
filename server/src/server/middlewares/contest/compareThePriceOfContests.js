const { BadRequest } = require('../../errors/errors');
const { CONTEST_PRICE } = require('../../constants');

const calculateThePriceForContests = require("../../utils/calculateThePriceForContests");

module.exports = (req, res, next) => {
    const { contests } = req.body;

    const priceAndContestsClient = contests.reduce( (accumulator, contests) => {

        accumulator.price += contests.price;
        accumulator.contests.push(contests.contestType);

        return accumulator

    }, {
        price: 0,
        contests: []
    });

    const priceOfContestsOnServer = calculateThePriceForContests(CONTEST_PRICE, priceAndContestsClient.contests);

    if(priceOfContestsOnServer !== priceAndContestsClient.price){

        return next(new BadRequest())

    }else{

        return next()
    }

};
const { BadRequest } = require('../../errors/errors');
const { CONTEST_PRICE } = require('../../constants');

module.exports = (req, res, next) => {
    const { contests } = req.body;

    contests.forEach( form => {
        const priceClient = form.price;
        const priceServer = CONTEST_PRICE.get(form.contestType);

        if(priceClient !== priceServer){
            return next(new BadRequest())
        }
    });

    next();
};
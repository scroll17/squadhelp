const uuidv1 = require('uuid/v1');

const error = require("../errors/errors");
const {HTTP_CODE : { SUCCESS }} = require('../utils/consts');

const { Contests } = require('../models');

const { CONTEST_PRICE } = require('../utils/consts');

const convertMapToObject = require('../utils/convertMapToObject');

const {
    ABILITY: { SUBJECT, ACTIONS },
} = require("../utils/consts");


module.exports.createContest = async (req, res, next) => {
    const { contests } = req.body;
    const { accessToken } = req;
    const uuid = uuidv1();


    contests.forEach( contest => {
       contest.contestId = uuid;
       contest.userId = accessToken.id;
    });

    try{
        await Contests.bulkCreate(contests);

        res.status(SUCCESS.CREATED.CODE).send("Contest created!")
    }catch (err) {
        next(new error.BadRequest(err.name))
    }
};

module.exports.sendPriceToContests =  (req, res, next) => {
    const price = convertMapToObject(CONTEST_PRICE);        //Object.fromEntries(CONTEST_PRICE.entries());

    if(price){
        res.send(price)
    }else{
        next( new error.NotFound())
    }
};

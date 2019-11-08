const uuidv1 = require('uuid/v1');
const { Contests, sequelize } = require('../models');

const error = require("../errors/errors");

const {
    ABILITY: { SUBJECT, ACTIONS },
    CONTEST_PRICE,
    CONTEST_FIELDS_TO_UPDATE,
    TYPE_OF_SCOPE: {
        UPDATE,
    },
    CONTEST_FIELDS: {
        PRIORITY
    },
    DEFAULT_MODEL_FIELDS: {
        UPDATE_AT,
        CREATED_AT
    }
} = require('../constants');

const {
    CREATED,
} = require('http-status-codes');

const convertMapToObject = require('../utils/convertMapToObject');

const transactionRollAndSendBadReq = require("../utils/transactionRollAndSendBadReq");

const isUndefined = require("lodash/isUndefined");
const omit = require("lodash/omit");

module.exports.createContest = async (req, res, next) => {
    const { accessTokenPayload: { id } } = req;
    const { contests } = req.body;
    const uuid = uuidv1();

    contests.forEach( contest => {
        contest.contestId = uuid;
        contest.userId = id;
    });

    try{
        await Contests.bulkCreate(contests);

        res.status(CREATED).send("Contest created!")
    }catch (err) {

        next(new error.BadRequest(err.name))
    }
};

module.exports.getPriceToContests =  (req, res, next) => {
    const price = convertMapToObject(CONTEST_PRICE);        //Object.fromEntries(CONTEST_PRICE.entries());

    if(price){
        res.send(price)
    }else{
        next( new error.NotFound())
    }
};

module.exports.getContestById = async (req, res, next) => {
    const { id } = req.params;
    const { options } = req;

    try {
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.CONTEST);

        const contest = await Contests.findByPk(id, options);

        if(contest){
            return res.send(contest);
        }else{
            return next(new error.NotFound())
        }

    } catch (err) {
        next(err);
    }
};

module.exports.getContestsByParams = async (req, res, next) => {
    const {
        searchParams,
        findOptions
    } = req.body;

    try {
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.CONTEST);

        findOptions.where = searchParams;

        const result = await Contests.findAll(findOptions);

        res.send(result)

    } catch (err) {
        next(err);
    }
};

module.exports.updateContest = async (req, res, next) => {
    const {
        accessTokenPayload,
        body: {
            updateFields
        },
        query: {
            id
        }
    } = req;

    try{
        if(isUndefined(accessTokenPayload)){
            return next(new error.BadRequest());
        }

        req.ability.throwUnlessCan(ACTIONS.UPDATE, SUBJECT.CONTEST);

        let transaction = await sequelize.transaction();

        const [numberOfUpdatedRows, [updateContest] ] = await Contests.scope(UPDATE).update(
            updateFields,
            {
                where: {
                    id
                },
                fields: CONTEST_FIELDS_TO_UPDATE,
                transaction,
            });

        if(numberOfUpdatedRows <= 0){
            return await transactionRollAndSendBadReq(transaction, next);
        }


        if(updateContest.userId !== accessTokenPayload.id){
            return await transactionRollAndSendBadReq(transaction, next)
        }else{
            await transaction.commit();

            return res.send(omit(updateContest, [UPDATE_AT, CREATED_AT, PRIORITY]));
        }

    }catch (err){
        next(err)
    }
};


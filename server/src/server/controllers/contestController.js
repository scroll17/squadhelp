const uuidv1 = require('uuid/v1');

const error = require("../errors/errors");
const {
    HTTP_CODE : { SUCCESS },
    ABILITY: { SUBJECT, ACTIONS },
    ENTRY_VALIDATION_STATUS,
    CONTEST_STATUS,
    CONTEST_PRICE,
    ROLE
} = require('../constants');

const { Contests, User, Entries, sequelize } = require('../models');


const convertMapToObject = require('../utils/convertMapToObject');


module.exports.createContest = async (req, res, next) => {
    const { accessToken } = req;
    const { contests } = req.body;
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
    const { accessToken } = req;
    try {
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.CONTEST);


        const options = {
            attributes: {
                exclude: ['updatedAt', 'createdAt'],
            },
            order: [['id', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['displayName', 'avatar'],
                },
            ]
        };

        if(accessToken.role === ROLE.BUYER){
            options.include.push({
                model: Entries,
                where: {
                    isValid: ENTRY_VALIDATION_STATUS.VALID,
                    status: sequelize.literal(`"Entries"."status" = CASE WHEN "Contests".status = '${CONTEST_STATUS.OPEN}' THEN 'resolve' ELSE 'expectation' END`)
                },

                required: false,
                attributes: ['text', 'file', 'status', 'id', 'liked'],

                include: [{
                    model: User,
                    attributes: ['displayName', 'avatar', 'id'],
                }]
            })
        }


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

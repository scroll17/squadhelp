const error = require("../errors/errors");
const { User, RefreshToken, Contests, Entries } = require('../models');

const {
    ABILITY: {
        ACTIONS, SUBJECT
    },
    TYPE_OF_SCOPE: {
        CLEAN_SEARCH,
        UPDATE
    },
    USER_FIELDS_TO_UPDATE,
    DEFAULT_MODEL_FIELDS:{
        CREATED_AT,
        UPDATE_AT,
        ID
    },
    USER_FIELDS:{
        PASSWORD
    },
    CONTEST_FIELDS: {
        TITLE,
        CONTEST_TYPE
    }
} = require("../constants");

const omit = require("lodash/omit");

const HttpStatus = require('http-status-codes');

module.exports.createUser = async (req, res, next) => {
    const { body } = req;
    try{
        req.ability.throwUnlessCan(ACTIONS.CREATE, SUBJECT.USER);

        const [user, created] = await User.findOrCreate({
            where: {email: body.email},
            defaults: {
                firstName: body.firstName,
                lastName: body.lastName,
                displayName: body.displayName,
                email: body.email,
                role: body.role,
                avatar: body.avatar,
                password: body.password
            },
        });

        if (!created){
            return next(new error.BadRequest());
        }

        req.body.user = user;
        next()
    }catch (err){
        next(err)
    }
};

module.exports.updateUserInformation = async (req, res, next) => {
    const {
        accessTokenPayload,
        body:{
            updateFields
        }
    } = req;

    try{
        req.ability.throwUnlessCan(ACTIONS.UPDATE, SUBJECT.USER);

        const [numberOfUpdatedRows, [updateUser] ] = await User.scope(UPDATE).update(
            updateFields,
            {
                where: {
                    id: accessTokenPayload.id
                },
                fields: USER_FIELDS_TO_UPDATE,
            });

        if(numberOfUpdatedRows <= 0){
            return next(new error.BadRequest());
        }

        res.send(
            omit(updateUser, [CREATED_AT, UPDATE_AT, PASSWORD])
        )
    }catch (err){
        next(err)
    }
};

module.exports.loginUser = async (req,res,next) => {
    const { user, tokenPair } = req.body;

    try{
        await RefreshToken.create({
            userId: user.id,
            tokenString: tokenPair.refreshToken
        });

        return res.send({
            user,
            tokenPair,
        });
    }catch (err) {
        next(err);
    }
};

module.exports.logoutUser = async (req,res,next) => {
    const { refreshToken } = req.body;
    try{
        await RefreshToken.destroy({
            where: {
                tokenString: refreshToken
            }
        });

        res.status(HttpStatus.OK).send('Your logout !');
    }catch (err) {
        next(err);
    }
};



module.exports.giveAccessUser = async (req,res,next) => {
    try{
        const { accessTokenPayload } = req;

        const user = await User.findOne({
            where: {email: accessTokenPayload.email},
            attributes: {
                exclude: [PASSWORD,CREATED_AT,UPDATE_AT]
            }
        });

        req.ability.throwUnlessCan(ACTIONS.READ, user);

        return res.send(user);
    }catch (err) {
        next(err)
    }
};


module.exports.getUserEntries = async (req,res,next) => {
    const { accessTokenPayload } = req;

    try{
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.ENTRIES);

        const entries = await Entries.findAll({
            where: {
                userId: accessTokenPayload.id
            },
            attributes: {
                exclude: [CREATED_AT,UPDATE_AT]
            },
            include: [{
                model: Contests,
                as: 'contestInfo',
                attributes: [TITLE, CONTEST_TYPE],
            }],
            order: [[ID, 'DESC']]
        });

        return res.send(entries);
    }catch (err) {
        next(err)
    }
};

module.exports.getUserContests = async (req,res,next) => {
    const { accessTokenPayload } = req;

    try{
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.CONTEST);

        const contests = await Contests.scope(CLEAN_SEARCH).findAll({
            where: {
                userId: accessTokenPayload.id
            }
        });

        return res.send(contests);
    }catch (err) {
        next(err)
    }
};


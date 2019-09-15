const error = require("../errors/errors");
const { User, RefreshToken, Contests, Entries } = require('../models');

const {
    TOKEN,
    HTTP_CODE: { SUCCESS },
    ABILITY: { ACTIONS, SUBJECT }
} = require("../constants");

const { verifyToken } = require('../middlewares/token/checkJwtTokens');

const { isEmpty } = require('lodash');

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
                password: body.hashPassword
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

module.exports.loginUser = async (req,res,next) => {
    const { user, tokenPair } = req.body;

        console.log('----- 3 -----')

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

        res.status(SUCCESS.OK.CODE).send('Your logout !');
    }catch (err) {
        next(err);
    }
};



module.exports.giveAccessUser = async (req,res,next) => {
    try{
        const decoded = await verifyToken(req.token, TOKEN.ACCESS);
        const user = await User.findOne({
            where: {email: decoded.email},
            attributes: {
                exclude: ['password','updatedAt', 'createdAt']
            }
        });

        req.ability.throwUnlessCan(ACTIONS.READ, user);

        return res.send(user);
    }catch (err) {
        next(err)
    }
};


module.exports.getUserEntries = async (req,res,next) => {
    try{
        const decoded = await verifyToken(req.token, TOKEN.ACCESS);
        const entries = await Entries.findAll({
            where: {
                userId: decoded.id
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            include: [{
                model: Contests,
                as: 'contestInfo',
                attributes: ['title', 'contestType'],
            }],
            order: [['id', 'DESC']]
        });

        return res.send(entries);
    }catch (err) {
        next(err)
    }
};

module.exports.getUserContests = async (req,res,next) => {
    try{
        const decoded = await verifyToken(req.token, TOKEN.ACCESS);
        const contests = await Contests.findAll({
            where: {
                userId: decoded.id
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
            raw: true,
            order: [['id', 'DESC']]
        });

        return res.send(contests);
    }catch (err) {
        next(err)
    }
};
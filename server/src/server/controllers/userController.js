const error = require("../errors/errors");
const { User, RefreshToken, Contests, Entries } = require('../models');

const {
    TOKEN,
    HTTP_CODE: { SUCCESS },
    ABILITY: {
        ACTIONS, SUBJECT
    },
    TYPE_OF_SCOPE: {
        CONTEST
    }
} = require("../constants");

const { verifyToken } = require('../middlewares/token/checkJwtTokens');

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

        res.status(SUCCESS.OK.CODE).send('Your logout !');
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
        const { accessTokenPayload } = req;
        const entries = await Entries.findAll({
            where: {
                userId: accessTokenPayload.id
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
        const { accessTokenPayload } = req;
        const contests = await Contests.scope(CONTEST.CLEAN_SEARCH).findAll({
            where: {
                userId: accessTokenPayload.id
            }
        });

        return res.send(contests);
    }catch (err) {
        next(err)
    }
};
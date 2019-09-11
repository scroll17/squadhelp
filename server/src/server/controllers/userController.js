const error = require("../errors/errors");
const { User, RefreshToken, Contests } = require('../models');

const {
    TOKEN,
    HTTP_CODE: { SUCCESS },
    ABILITY: { ACTIONS }
} = require("../constants");

const { verifyToken } = require('../middlewares/token/checkJwtTokens');

module.exports.createUser = async (req, res, next) => {
    const { body } = req;
    try{
        /*req.ability.js.throwUnlessCan(ACTIONS.CREATE, SUBJECT.USER);               // CASL*/

        const [user, created] = await User.findOrCreate({
            where: {email: body.email},
            defaults: {
                firstName: body.firstName,
                lastName: body.lastName,
                displayName: body.displayName,
                email: body.email,
                role: body.role,
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


module.exports.getUserContests = async (req,res,next) => {
    try{
        req.ability.throwUnlessCan(ACTIONS.READ, 'Conversation');

        const decoded = await verifyToken(req.token, TOKEN.ACCESS);
        const user = await Contests.findAll({
            where: {
                userId: decoded.id
            },
            raw: true,
            rejectOnEmpty: true,
            order: [['updatedAt', 'ASC']]

        });

        return res.send(user);
    }catch (err) {
        next(err)
    }
};
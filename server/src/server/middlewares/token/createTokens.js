const { jwtSignAccess, jwtSignRefresh } = require('./checkJwtTokens');
const {  RefreshToken } = require('../../models');

module.exports = async (req, res, next) => {
    const { user } = req.body;
    try{
        const tokenPair = {
            accessToken: await jwtSignAccess(user.email, user.firstName, user.role, user.id),
            refreshToken: await jwtSignRefresh(user.id, user.role)
        };

        await RefreshToken.create({
            userId: user.id,
            tokenString: tokenPair.refreshToken
        });

        return res.send({
            user,
            tokenPair,
        });
    }catch (err) {
        next(err)
    }
};

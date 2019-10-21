const { verifyToken } = require('./checkJwtTokens');

const { TOKEN } = require("../../constants");

module.exports = async (req, res, next) => {
    const { refreshToken } = req.body;
    try{
        req.decoded = await verifyToken(refreshToken, TOKEN.REFRESH);

        return next()
    }catch (err) {
        next(err)
    }
};

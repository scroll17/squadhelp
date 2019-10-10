const abilyti = require('../casl/index');
const { verifyToken } = require('./token/checkJwtTokens');

const { TOKEN } = require('../constants');

module.exports = async (req, res, next) => {
    try{
        if(req.token){
            const decoded = await verifyToken(req.token, TOKEN.ACCESS);

            req.ability =  abilyti.defineAbilitiesFor(decoded.role, decoded);
            req.accessTokenPayload = decoded;
        }else{
            req.ability = abilyti.defineAbilitiesFor(null)
        }
        next()
    }catch (err) {
        next(err)
    }
};
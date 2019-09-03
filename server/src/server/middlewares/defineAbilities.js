const abilyti = require('../casl/index');
const { verifyToken } = require('./token/checkJwtTokens');

const { TOKEN } = require("../utils/consts");

module.exports = async (req, res, next) => {
    try{
        if(req.token){
            const decoded = await verifyToken(req.token, TOKEN.ACCESS);

            req.ability =  abilyti.defineAbilitiesFor(decoded.role, decoded);
            req.accessToken = decoded;
        }else{
            req.ability = abilyti.defineAbilitiesFor(null)
        }
        next()
    }catch (err) {
        next(err)
    }
};

/*router.use(['/user','/login'], (req, res, next) => {
    console.log('---- req.method ---- ', req.method);
    console.log('---- req.baseUrl ---- ', req.baseUrl);
    // req.method = "POST"  && req.baseUrl = "/login" || req.originalUrl = "/login" || req.Url.path = "/login"
    next();
});*/

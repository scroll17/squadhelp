const { AuthenticationTimeout, Unauthorized  } = require("../errors/errors");

module.exports = (err,req,res, next) =>{
    switch (err.name) {
        case 'TokenExpiredError':{
            const error = new AuthenticationTimeout(err.message);
            res.status(error.status).send(err);
            break;
        }
        case 'JsonWebTokenError':{
            const error = new Unauthorized(err.message);
            res.status(error.status).send(err);
            break;
        }
        case 'NotBeforeError':{
            const error = new Unauthorized(err.message);
            res.status(error.status).send(err);
            break;
        }
        default:
            next(err)
    }
};

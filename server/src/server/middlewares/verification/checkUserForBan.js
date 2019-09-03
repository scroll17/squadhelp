const { Forbidden } = require("../../errors/errors");
const { ERROR_MESSAGE } = require('../../utils/consts');

module.exports = (req,res,next) => {
    const { isBanned } = req.body.user;
    try{
        if(isBanned){
            return next(new Forbidden(ERROR_MESSAGE.YOUR_BANNED));
        }else{
            return next()
        }
    }catch (err) {
        next(err);
    }
};





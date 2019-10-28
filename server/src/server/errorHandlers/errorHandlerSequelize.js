const { Forbidden } = require("../errors/errors");
module.exports = (err,req,res,next) =>{
    next(err);
};

const { Forbidden } = require("../errors/errors");
module.exports = (err,req,res,next) =>{
    if(err.name === "u"){
        const error = new Forbidden();
        //const {subject, action, message} = err;
        res.status(error.status).send(err.message);
    }else{
        next(err);
    }
};

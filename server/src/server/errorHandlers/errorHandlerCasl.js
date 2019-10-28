const { Forbidden } = require("../errors/errors");
module.exports = (err,req,res,next) =>{
    if(err.name === "u"){
        const error = new Forbidden();
        //const {subject, action, message} = err;

        if(err.message.type === 'casl'){
            return res.status(error.status).send(err.message.text);
        }else{
            res.status(error.status).send(error.message);
        }
    }else{
        next(err);
    }
};

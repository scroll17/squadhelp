const { NotFound } = require("../errors/errors");
module.exports = (err,req,res,next) =>{
    if(err.name === "bcrypt_err"){
        const error = new NotFound();
        res.status(error.status).send(error.message);
    }else{
      return next(err)
    }
};

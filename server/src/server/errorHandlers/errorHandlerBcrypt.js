const { BadRequest } = require("../errors/errors");
module.exports = (err,req,res,next) =>{
    if(err.name === "bcrypt_err"){
        const error = new BadRequest();
        res.status(error.status).send("Invalid password");
    }else{
      return next(err)
    }
};

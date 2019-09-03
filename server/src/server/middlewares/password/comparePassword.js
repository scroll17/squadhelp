const bcrypt = require('bcrypt');
const { NotFound } = require("../../errors/errors");

module.exports = async (req, res, next) => {
    const { password, user } = req.body;

    try{
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(isValidPassword){
            return next();
        }else{
            return next({name: 'bcrypt_err'});
        }

    }catch (err) {
        next(err)
    }
};

const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    const { password, user } = req.body;

    try{
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(isValidPassword){
            delete req.body.user.password;
            return next();
        }else{
            return next({name: 'bcrypt_err'});
        }
    }catch (err) {
        next(err)
    }
};

const { NotFound } = require("../../errors/errors");
const { User } = require('../../models');


module.exports = async (req,res,next) => {
    const { email } = req.body;

    try{
        const foundUser = await User.findOne({
            where: {
                email: email
            },
            raw: true,
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
        });

        if(foundUser){
            req.body.user = foundUser;
            return next();
        }else{
            return next(new NotFound());
        }

    }catch (err) {
        next(err);
    }
};






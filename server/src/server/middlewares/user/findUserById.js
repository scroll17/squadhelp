const { NotFound } = require("../../errors/errors");
const { User } = require('../../models');

module.exports = (idSource) => async (req,res,next) => {

    let id;
    if(idSource === 'decoded'){
        console.log('decoded 2', req.decoded);
        id = req.decoded.userId;
    }else if(idSource === 'params'){
        id = req.params.id;
    }


    try{
        req.body.user = await User.findByPk( id, {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'password']
            }
        });

        if(req.body.user){
            next();
        }else{
            next(new NotFound())
        }
    }catch (err) {
        next(err)
    }
};
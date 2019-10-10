const { NotFound, BadRequest } = require("../../errors/errors");
const { User } = require('../../models');

const { SOURCE_ID } = require('../../constants');
const isNull = require("lodash/isNull");

module.exports = (idSource) => async (req,res,next) => {
    const { DECODED, PARAMS, PAYLOAD } = SOURCE_ID;
    let id;

    switch (idSource) {
        case DECODED:
            id = req.decoded.userId;
            break;
        case PARAMS:
            id = req.params.id;
            break;
        case PAYLOAD:
            id = 2; // req.accessTokenPayload.id; TODO
            break;
        default:
            id = null;
    }

    if(isNull(id)){
        return next(new BadRequest())
    }


    try{
        req.body.user = await User.findByPk( id, {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'password']
            }
        });

        if(req.body.user){
            return next();
        }else{
            return next(new NotFound())
        }
    }catch (err) {
        next(err)
    }
};
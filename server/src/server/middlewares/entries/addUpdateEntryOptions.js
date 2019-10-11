const {
    TYPE_UPDATE_ENTRY,
    ENTRIES_STATUS
} = require('../../constants');


const { BadRequest } = require('../../errors/errors');


module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { type } = req.query;
    const { updateData } = req.body;

    const options = {
        where: {
            id
        },
        fields: [type]
    };

    if(TYPE_UPDATE_ENTRY.LIKED === type){

        const { liked } = updateData;
        req.updateFields = {
            liked
        }
    }else if(TYPE_UPDATE_ENTRY.STATUS === type){
        const { status } = updateData;

        if(status === ENTRIES_STATUS.RESOLVE){
            return next("route");

        }else{
            options.fields.push(TYPE_UPDATE_ENTRY.LIKED);

            req.updateFields = {
                status,
                liked: false
            };
        }
    }else{
        return next(new BadRequest());
    }

    req.options = options;
    next()
};


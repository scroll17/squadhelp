const {
    ENTRY_FIELDS: {
        LIKED,
        STATUS
    },
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

    if(LIKED === type){

        const { liked } = updateData;
        req.updateFields = {
            liked
        }
    }else if(STATUS === type){
        const { status } = updateData;

        if(status === ENTRIES_STATUS.RESOLVE){
            return next("route");

        }else{
            options.fields.push(LIKED);

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


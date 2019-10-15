const {
    ENTRY_VALIDATION_STATUS,
    CONTEST_STATUS,
    ROLE,
    DEFAULT_MODEL_FIELDS:{
      UPDATE_AT, CREATED_AT, ID
    },
    USER_FIELDS: {
        DISPLAY_NAME, AVATAR
    },
    CONTEST_FIELDS: {
        PRIORITY
    },
    ENT
} = require("../../constants");

const {
    User,
    Entries,
    sequelize
} = require("../../models");

module.exports = (req, res, next) => {
    const { accessTokenPayload } = req;

    req.options = {
        attributes: {
            exclude: [UPDATE_AT, CREATED_AT, PRIORITY],
        },
        order: [[ID, 'DESC']],
        include: [
            {
                model: User,
                attributes: [DISPLAY_NAME, AVATAR],
            },
        ]
    };

    if(accessTokenPayload.role === ROLE.BUYER){
        req.options.include.push({
            model: Entries,
            where: {
                isValid: ENTRY_VALIDATION_STATUS.VALID,
                status: sequelize.literal(`"Entries"."status" = CASE WHEN "Contests".status = '${CONTEST_STATUS.OPEN}' THEN 'expectation' ELSE 'resolve' END`)
            },

            required: false,
            attributes: ['text', 'file', 'status', 'id', 'liked'],

            include: [{
                model: User,
                attributes: [DISPLAY_NAME, AVATAR, ID],
            }]
        })
    }

    next()
};

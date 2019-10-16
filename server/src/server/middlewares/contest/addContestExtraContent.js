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
    ENTRY_VALIDATION_STATUS: {
        VALID
    }
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
            include: [
                [sequelize.literal(`
                        (SELECT COUNT("Entries"."id") 
                         FROM "Entries" 
                         WHERE "Entries"."contestId" = "Contests"."id" AND "Entries"."isValid" = '${VALID}')
                    `), 'numberOfEntry']
            ],
            exclude: [UPDATE_AT, CREATED_AT, PRIORITY],
        },
        include: [
            {
                model: User,
                attributes: [DISPLAY_NAME, AVATAR],
            },
        ],
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
            }],
        });

        req.options.order = [
            [Entries, "liked", "DESC"]
        ];
    }else if(accessTokenPayload.role === ROLE.CREATIVE){

        req.options.include.push({
            model: Entries,
            attributes: []
        })
    }

    next()
};

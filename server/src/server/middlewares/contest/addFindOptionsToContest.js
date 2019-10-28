const { sequelize, Entries } = require("../../models");

const  {
    DEFAULT_MODEL_FIELDS: {
        CREATED_AT,
    },
    CONTEST_FIELDS: {
        PRIORITY,
        CONTEST_ID,
        TARGET_CUSTOMERS,
        NAME
    },
    ENTRY_VALIDATION_STATUS: {
        VALID
    }
} = require("../../constants");

module.exports = (req, res, next) => {

    req.body.findOptions = {
        attributes: {
            include: [
                [
                    sequelize.fn("COUNT", sequelize.literal(`CASE "Entries"."isValid" when '${VALID}' THEN 1 ELSE null END`)),
                    'numberOfEntry'
                ]
            ],
            exclude: [
                CREATED_AT,
                PRIORITY,
                CONTEST_ID,
                TARGET_CUSTOMERS,
                NAME
            ],
        },
        include: [
            {
                model: Entries,
                attributes: [],
            }
        ],
        order: [['id', 'DESC']],
        group: ["Contests.id"],
    };

    next();
};

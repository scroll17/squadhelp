const { sequelize, Entries } = require("../../models");

const  {
    DEFAULT_MODEL_FIELDS: {
        CREATED_AT,
        UPDATE_AT,
    },
    CONTEST_FIELDS: {
        PRIORITY,
        CONTEST_ID,
        STYLE,
        TARGET_CUSTOMERS,
        NAME
    },
} = require("../../constants");

module.exports = (req, res, next) => {
    const {
        searchParams
    } = req.body;


    req.body.findOptions = {
        where: searchParams,
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Entries.id")), 'numberOfEntry']
            ],
            exclude: [
                UPDATE_AT,
                CREATED_AT,
                PRIORITY,
                CONTEST_ID,
                STYLE,
                TARGET_CUSTOMERS,
                NAME
            ],
        },
        include: [
            {
                model: Entries,
                attributes: []
            }
        ],
        group: ["Contests.id"]
    };

    next();
};

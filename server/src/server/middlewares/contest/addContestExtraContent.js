const {
    ENTRY_VALIDATION_STATUS,
    CONTEST_STATUS,
    ROLE
} = require("../../constants");

const {
    User,
    Entries,
    sequelize
} = require("../../models");

module.exports = (req, res, next) => {
    const { accessToken } = req;

    req.options = {
        attributes: {
            exclude: ['updatedAt', 'createdAt', 'priority'],
        },
        order: [['id', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['displayName', 'avatar'],
            },
        ]
    };

    if(accessToken.role === ROLE.BUYER){
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
                attributes: ['displayName', 'avatar', 'id'],
            }]
        })
    }

    next()
};

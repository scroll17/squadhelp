const error = require("../errors/errors");
const { Contests } = require('../models');

const {
    ABILITY: { SUBJECT, ACTIONS },
} = require("../constants");


module.exports.getContestById = async (req, res, next) => {
    const { id } = req.params;
    try {
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.CONTEST);

        const contest = await Contests.findByPk(id, {
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            },
        });
        if(contest){
            return res.send(contest);
        }else{
            return next(new error.NotFound())
        }

    } catch (err) {
        next(err);
    }
};
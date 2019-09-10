const error = require("../errors/errors");
const { User } = require('../models');

const {
    ABILITY: { SUBJECT, ACTIONS },
} = require("../constants");


module.exports.getAllUsers = async (req, res, next) => {
    try{
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.ALL);                      // CASL

        const users = await User.findAll({
            raw: true,
            rejectOnEmpty: true,
            attributes: {
                exclude: ['password','updatedAt', 'createdAt']
            },
            order: [['email', 'ASC'], ['id', 'ASC']]
        });
        res.send(users);

    }catch (err) {
        next(new error.NotFound(err.name))
    }
};

module.exports.updateUserById = async (req, res, next) => {
    const { id } = req.params;
    const { isBanned, user } = req.body;

    try {
        if(req.ability.cannot(ACTIONS.UPDATE, user)){
            return next(new error.Forbidden());
        }
        //req.ability.throwUnlessCan('update', user);                                     // CASL

        const [numberOfUpdatedRows, updateUser] = await User.update({ isBanned }, {
            where: { id },
            fields: ['isBanned'],
            returning: true,
            plain: true,
        });

        if(numberOfUpdatedRows <= 0){
            return next(new error.NotFound());
        }

        return res.send(updateUser);
    } catch (err) {
        next(err);
    }
};
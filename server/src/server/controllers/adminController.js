const error = require("../errors/errors");
const { User, Entries, Contests, sequelize } = require('../models');

const {
    ABILITY: { SUBJECT, ACTIONS },
} = require("../constants");

const last = require('lodash/last');

module.exports.getAllUsers = async (req, res, next) => {
    try{
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.ALL);

        const users = await User.findAll({
            rejectOnEmpty: true,
            attributes: {
                exclude: ['password','updatedAt', 'createdAt']
            },
            order: [['email', 'ASC'], ['id', 'ASC']]
        });

        res.send(users);
    }catch (err) {
        next(err)
    }
};

module.exports.updateUserById = async (req, res, next) => {
    const { id } = req.params;
    const { isBanned, user } = req.body;

    try {
        req.ability.throwUnlessCan(ACTIONS.UPDATE, user);

        const [numberOfUpdatedRows, updateUser] = await User.update({ isBanned }, {
            where: { id },
            fields: ['isBanned'],
            returning: true,
            //nest : true
        });

        if(numberOfUpdatedRows <= 0){
            return next(new error.NotFound());
        }

        return res.send(last(updateUser));
    } catch (err) {
        console.log(err);

        next(err);
    }
};

module.exports.getAllEntries = async (req, res, next) => {
    try{
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.ALL);

        const entries = await Entries.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'userId'],
            },
            include: [
                {
                    model: User,
                    attributes: ['displayName', 'avatar', 'id']
                },
                {
                    model: Contests,
                    as: 'contestInfo',
                    attributes: ['title']
                },
            ],
            order: [['id', 'DESC']]
        });


        res.send(entries);

    }catch (err) {
        next(err)
    }
};


module.exports.updateEntryById = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        let transaction = await sequelize.transaction();

        const [numberOfUpdatedRows, updateEntries] = await Entries.update({
            isValid: status
        }, {
            where: { id },
            fields: ['isValid'],
            returning: true,
        });

        if(numberOfUpdatedRows !== 1){
            await transaction.rollback();
            return next(new error.BadRequest());
        }

        await transaction.commit();
        return res.send(last(updateEntries));
    } catch (err) {
        console.log(err)
        next(err);
    }
};

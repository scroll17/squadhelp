const error = require("../errors/errors");
const { User, Entries, Contests, sequelize } = require('../models');

const {
    ABILITY: {
        SUBJECT, ACTIONS
    },
    ENTRY_VALIDATION_STATUS,
    TYPE_OF_SCOPE: {
        CLEAN_SEARCH
    },
} = require("../constants");

const last = require('lodash/last');

module.exports.getAllUsers = async (req, res, next) => {
    try{
        req.ability.throwUnlessCan(ACTIONS.READ, SUBJECT.ALL);

        const users = await User.scope(CLEAN_SEARCH).findAll({
            rejectOnEmpty: true,
            order: [["email", 'ASC'], ['id', 'ASC']]
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
            fields: ["isBanned"],
            returning: true,
        });

        if(numberOfUpdatedRows <= 0){
            return next(new error.NotFound());
        }

        return res.send(last(updateUser));
    } catch (err) {
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
            where: {
              isValid: ENTRY_VALIDATION_STATUS.PENDING
            },
            include: [
                {
                    model: User,
                    attributes: ['displayName', 'avatar', 'id', 'email']
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
    const { updateData } = req.body;

    try {
        req.ability.throwUnlessCan(ACTIONS.UPDATE, SUBJECT.ENTRIES);

        let transaction = await sequelize.transaction();

        const [numberOfUpdatedRows, updateEntries] = await Entries.update({
            isValid: updateData
        }, {
            where: { id },
            fields: ['isValid'],
            returning: true,
            transaction
        });

        if(numberOfUpdatedRows !== 1){
            await transaction.rollback();
            return next(new error.BadRequest());
        }

        await transaction.commit();

        req.body.updateEntries = last(updateEntries);
        next();

    } catch (err) {
        next(err);
    }
};

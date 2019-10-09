const { Entries, sequelize } = require('../models');

const error = require('../errors/errors');
const {
    HTTP_CODE: { SUCCESS },
    ABILITY: {ACTIONS, SUBJECT},
    TYPE_UPDATE_ENTRY,
    ENTRIES_STATUS
} = require('../constants');

const values = require("lodash/values");

module.exports.createEntry = async (req, res, next) => {
    const contentOfEntry = JSON.parse(req.body.contentOfEntry);

    try{
        req.ability.throwUnlessCan(ACTIONS.CREATE, SUBJECT.ENTRIES);

        await Entries.create(contentOfEntry);

        res.status(SUCCESS.CREATED.CODE).send("Entry created!")

    }catch (err){
        next(err)
    }
};

module.exports.updateEntryById = async (req, res, next) => {
    const { id } = req.params;
    const { type } = req.query;
    const { updateField } = req.body;


    let transaction = await sequelize.transaction();

    try {
        req.ability.throwUnlessCan(ACTIONS.UPDATE, SUBJECT.ENTRIES);

        const [numberOfUpdatedRows, updatedRows] = await Entries.update(
            updateField,
            {
                where: { id },
                fields: [type],
                returning: true,
                raw: true,
                transaction
            }
        );

        if(numberOfUpdatedRows !== 1){
            await transaction.rollback();
            return next(new error.BadRequest());
        }

        if(type === TYPE_UPDATE_ENTRY.STATUS && updateField.status === ENTRIES_STATUS.RESOLVE){
            req.transaction = transaction;

            req.body.entryRefContestId = updatedRows[0].contestId;
            return next()
        }else{

            await transaction.commit();
            return res.status(SUCCESS.ACCEPTED.CODE).send(`Entry ${type}: ${values(updateField)}`)
        }

    } catch (err) {
        next(err);
    }
};

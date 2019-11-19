const { Entries, sequelize } = require('../models');
const {
    CREATED,
    ACCEPTED
} = require('http-status-codes');

const {
    ABILITY: {
        ACTIONS,
        SUBJECT
    },
    ENTRIES_STATUS: {
        REJECT,
        RESOLVE
    },
    ENTRY_FIELDS: {
        LIKED
    }
} = require('../constants');

const transactionRollAndSendBadReq = require("../utils/transactionRollAndSendBadReq");


module.exports.createEntry = async (req, res, next) => {
    const { contentOfEntry } = req.body;

    try{
        req.ability.throwUnlessCan(ACTIONS.CREATE, SUBJECT.ENTRIES);

        await Entries.create(contentOfEntry);

        res.status(CREATED).send("Entry created!")

    }catch (err){
        next(err)
    }
};

module.exports.updateEntryById = async (req, res, next) => {
    const { updateFields, options } = req;
    const { type } = req.query;

    try {
        req.ability.throwUnlessCan(ACTIONS.UPDATE, SUBJECT.ENTRIES);

        let transaction = await sequelize.transaction();
        options.transaction = transaction;

        const [numberOfUpdatedRows] = await Entries.update(
            updateFields,
            options
        );

        if(numberOfUpdatedRows !== 1){
            return  await transactionRollAndSendBadReq(transaction, next);
        }

        let sendData;
        if(type === LIKED){
            sendData = updateFields.liked ? `Entry ${type}` : `Entry un-${type}`;
        }else{
            sendData = `Entry ${updateFields.status}`
        }

        await transaction.commit();
        return res.status(ACCEPTED).send(sendData)

    } catch (err) {
        next(err);
    }
};
module.exports.updateEntryToResolve = async (req, res, next) => {
    const { id } = req.params;
    const {
        updateData: {
            contestId
        }
    } = req.body;

    try{
        req.ability.throwUnlessCan(ACTIONS.UPDATE, SUBJECT.ENTRIES);

        let transaction = await sequelize.transaction();

        const [, numberOfUpdateRows] = await sequelize.query(`
                UPDATE "Entries" 
                SET status =
                    CASE
                        WHEN "id"=:id THEN :resolve
                        ELSE :reject
                    END,
                    liked =
                    CASE 
                        WHEN "id" <> :id THEN false
                        ELSE "liked"
                    END
                WHERE "contestId" = :contestId
            `,
            {
                replacements: {
                    id: id,
                    resolve: RESOLVE,
                    reject: REJECT,
                    contestId: contestId,
                },
                transaction,
                model: Entries,
                type: sequelize.QueryTypes.UPDATE
            });

        if(numberOfUpdateRows === 0){
            return await transactionRollAndSendBadReq(transaction, next);
        }else {

            req.transaction = transaction;
            next()
        }

    }catch (err) {
        next(err)
    }
};

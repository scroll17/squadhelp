const { Entries, sequelize } = require('../models');

const {
    HTTP_CODE: {
        SUCCESS
    },
    ABILITY: {
        ACTIONS, SUBJECT
    },
    ENTRIES_STATUS,
    TYPE_UPDATE_ENTRY
} = require('../constants');

const transactionRollAndSendBadReq = require("../utils/transactionRollAndSendBadReq");


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

    const { updateFields, options } = req;
    const { type } = req.query;
    const { LIKED } = TYPE_UPDATE_ENTRY;

    let transaction = await sequelize.transaction();
    options.transaction = transaction;

    try {
        req.ability.throwUnlessCan(ACTIONS.UPDATE, SUBJECT.ENTRIES);

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
        return res.status(SUCCESS.ACCEPTED.CODE).send(sendData)

    } catch (err) {
        next(err);
    }
};
module.exports.updateEntryToResolve = async (req, res, next) => {
    const { id } = req.params;
    const { updateData } = req.body;

    const { contestId, contestUuid } = updateData;
    const { RESOLVE, REJECT } = ENTRIES_STATUS;

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
        req.body.contestUuid = contestUuid;
        next()
    }
};

// updatedRows.reduce((prevUpdateRows, currentUpdateRows) => {
//     const { id: rowId, contestId, status } = currentUpdateRows;
//
//     if(prevUpdateRows.contestId !== contestId){
//         return next(new BadRequest())
//     }
//
//     if(`${rowId}` === id && status !== "x"){
//         return next(new BadRequest())
//     }
//
//     return currentUpdateRows;
// }, {
//     contestId
// });

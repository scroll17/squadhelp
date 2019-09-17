const { Entries, User, sequelize } = require('../models');

const error = require('../errors/errors');
const { HTTP_CODE: { SUCCESS }, ABILITY: {ACTIONS, SUBJECT}, TYPE_UPDATE_ENTRY } = require('../constants');


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


    let updatedField;
    if(type === TYPE_UPDATE_ENTRY.STATUS){
        updatedField = {
            status: updateField
        }
    }else if(type === TYPE_UPDATE_ENTRY.LIKED){
        updatedField = {
            liked: updateField
        }
    }


    try {
        req.ability.throwUnlessCan(ACTIONS.UPDATE, SUBJECT.ENTRIES);

        const [numberOfUpdatedRows, ] = await Entries.update( updatedField, {
            where: { id },
            fields: [type],
            transaction
        });


        if(numberOfUpdatedRows !== 1){
            await transaction.rollback();
            return next(new error.BadRequest());
        }

        await transaction.commit();

        res.status(SUCCESS.ACCEPTED.CODE).send(`Entry ${type}: ${updateField}`)

    } catch (err) {
        next(err);
    }
};

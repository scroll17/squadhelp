const { Entries } = require('../models');

const { HTTP_CODE: { SUCCESS }, ABILITY: {ACTIONS, SUBJECT} } = require('../constants');

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

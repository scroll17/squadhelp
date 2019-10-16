const {
    updateEntrySchema,
    createEntrySchema
} = require( '../../utils/yupSchemas/entrySchema');


const validateDataOnUpdateEntry = async (req, res, next) => {
    const { updateData } = req.body;
    try {
        req.body.updateData = await updateEntrySchema.validate(updateData, {stripUnknown: true});
        next()

    } catch (e) {
        next(e);
    }
};

const validateDataOnCreateEntry = async (req, res, next) => {
    const contentOfEntry = JSON.parse(req.body.contentOfEntry);
    try {
        req.body.contentOfEntry = await createEntrySchema.validate(contentOfEntry, {stripUnknown: true});
        next()

    } catch (e) {
        next(e);
    }
};

module.exports = {
    validateDataOnUpdateEntry,
    validateDataOnCreateEntry
};

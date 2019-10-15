const yup = require('yup');

const id = yup
    .number()
    .positive()
    .integer();

const updateEntrySchema = yup.object({
    liked: yup
        .boolean()
        .notRequired(),
    status: yup
        .string()
        .notRequired(),
    contestUuid: yup
        .string()
        .notRequired(),
    userId: id
        .notRequired(),
    contestId: id
        .notRequired(),
});

const createEntrySchema = yup.object({
    file: yup
        .string()
        .notRequired(),
    text: yup
        .string()
        .min(1)
        .notRequired(),
    userId: id
        .required(),
    contestId: id
        .required(),
});


module.exports = {
    updateEntrySchema,
    createEntrySchema
};
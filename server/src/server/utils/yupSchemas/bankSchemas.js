const yup = require('yup');

const number = yup
    .string()
    .required();

const paymentContestSchema = yup.object({
    number,
    expiry: yup
        .string()
        .length(5)
        .required(),
    cvc: yup
        .string()
        .length(3)
        .required(),
    contests: yup
        .array().of(
            yup.string()
        )
        .required()
});


const paymentEntrySchema = yup.object({
    number,
    sum: yup
        .number()
        .positive()
        .min(1)
        .required(),
});

module.exports = {
    paymentContestSchema,
    paymentEntrySchema
};
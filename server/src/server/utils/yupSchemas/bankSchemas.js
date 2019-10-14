const yup = require('yup');
const {
    ROLE: {
        BUYER, CREATIVE
    }
} = require("../../constants");

const number = yup
    .string()
    .required();

const sum = yup
    .number()
    .positive()
    .min(1);

const csv = yup
    .string()
    .length(3)

const createUserSchema = yup.object({
    email: email.required(),
    firstName: firstName.required(),
    lastName: lastName.required(),
    displayName: displayName.required(),
    password: password.required(),
    role
});


const updateUserSchema = yup.object({
    email: email.notRequired(),
    firstName: firstName.notRequired(),
    lastName: lastName.notRequired(),
    displayName: displayName.notRequired(),
    password: password.notRequired()
});

module.exports = {
    createUserSchema,
    updateUserSchema
};
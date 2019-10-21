const yup = require('yup');
const {
    ROLE: {
        BUYER, CREATIVE
    }
} = require("../../constants");

const email = yup
    .string()
    .email();

const firstName = yup
    .string()
    .min(1);

const lastName = yup
    .string()
    .min(3);

const displayName = yup
    .string()
    .min(4);

const password = yup
    .string()
    .min(8)
    .matches(/^[a-z]|[0-9]|[A-Z]/);

const role = yup
    .string()
    .oneOf([BUYER, CREATIVE])
    .required();

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
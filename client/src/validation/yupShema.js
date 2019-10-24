import * as yup from 'yup';

const firstName = yup
    .string()
    .min(1);

const lastName = yup
    .string()
    .min(1);

const displayName = yup
    .string()
    .min(4);

const email = yup
    .string()
    .email();

const password = yup
    .string()
    .min(8)
    .matches(/^[a-z]|[0-9]|[A-Z]/);

export const userRequired = yup.object({
    firstName : firstName.required(),
    lastName : lastName.required(),
    displayName : displayName.required(),
    email: email.required(),
    password: password.required(),
    role: yup
        .string()
        .required(),
});

export const userNotRequired = yup.object({
    firstName : firstName.notRequired(),
    lastName : lastName.notRequired(),
    displayName : displayName.notRequired(),
    email: email.notRequired(),
    password: password.notRequired(),
});


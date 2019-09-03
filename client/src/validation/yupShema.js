import * as yup from 'yup';

const schema = yup.object().shape({
    firstName : yup
        .string()
        .min(1)
        .required(),
    lastName : yup
        .string()
        .min(3)
        .required(),
    displayName : yup
        .string()
        .min(4)
        .required(),
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .min(8)
        .matches(/^[a-z]|[0-9]|[A-Z]/)
        .required(),
    role: yup
        .string()
        .required(),
});


export default schema;

/*

const schema = yup.object().shape({
    firstName : yup
        .string()
        .min(1, "Must be longer than 1 characters")
        .required("Required"),
    lastName : yup
        .string()
        .min(1, "Must be longer than 1 characters")
        .required("Required"),
    displayName : yup
        .string()
        .min(1, "Must be longer than 1 characters")
        .required("Required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Required"),
    password: yup
        .string()
        .min(8, 'At least 8 chars')
        .matches(/^[a-z]|[0-9]|[A-Z]$/, 'Password must have a number and a capital letter'),
    role: yup
        .string()
        .required("Required"),
});*/

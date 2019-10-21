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

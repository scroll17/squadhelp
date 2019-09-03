import * as yup from 'yup';
import schema from "./yupShema";


import isEmpty from 'lodash/isEmpty';

export const asyncValidationSignUpForm = async (values) => {
    const errors = {};

    try{

        const firstName = await yup.reach(schema, 'firstName').isValid(values.firstName);
        const lastName = await yup.reach(schema, 'lastName').isValid(values.lastName);
        const displayName = await yup.reach(schema, 'displayName').isValid(values.displayName);
        const email = await yup.reach(schema, 'email').isValid(values.email);
        const password = await yup.reach(schema, 'password').isValid(values.password);
        const passwordRepeat = await yup.reach(schema, 'password').isValid(values.passwordRepeat);


        if(!firstName) {
            errors.firstName = 'Field "First name" cannot be empty'
        }
        if(!lastName) {
            errors.lastName = 'Field "Last name" cannot be empty'
        }

        if(!displayName) {
            errors.displayName = 'Field "Display name" should be more than 4 characters'
        }


        if(isEmpty(values.email)){
            errors.email = 'Field "Email address" cannot be empty'
        }else if(!email) {
            errors.email = 'Please check the format of email address'
        }


        if(isEmpty(values.password)) {
            errors.password = 'Field "Password" cannot be empty'
        }else if(!password){
            errors.password = 'Field "Password" should be more than 8 characters'
        }else if(values.password !== values.passwordRepeat){
            errors.password = 'Password confirmation needs to match original password';
        }

        if(isEmpty(values.passwordRepeat)){
            errors.passwordRepeat = 'Field "Password confirmation" cannot be empty'
        }else if(!passwordRepeat){
            errors.passwordRepeat = 'Field "Password confirmation" should be more than 8 characters'
        }else if(values.password !== values.passwordRepeat){
            errors.passwordRepeat = 'Password confirmation needs to match original password'
        }

    }catch (e) {
        return await Promise.reject(errors)
    }


    if (Object.keys(errors).length === 0) {
        return await Promise.resolve()
    }else {
        return await Promise.reject(errors)
    }

};


import * as yup from 'yup';
import { userNotRequired as schema } from "./yupShema";

import { USER_FIELDS } from "../constants";


export const asyncValidationUpdateUserForm = async (values) => {
    const {
        DISPLAY_NAME,
        EMAIL,
        PASSWORD,
        LAST_NAME,
        FIRST_NAME,
    } = USER_FIELDS;

    const errors = {};

    try{

        const firstName = await yup.reach(schema, FIRST_NAME).isValid(values.firstName);
        const lastName = await yup.reach(schema, LAST_NAME).isValid(values.lastName);
        const displayName = await yup.reach(schema, DISPLAY_NAME).isValid(values.displayName);
        const email = await yup.reach(schema, EMAIL).isValid(values.email);
        const password = await yup.reach(schema, PASSWORD).isValid(values.password);



        if(!firstName) {
            errors.firstName = 'Cannot be empty'
        }
        if(!lastName) {
            errors.lastName = 'Cannot be empty'
        }
        if(!displayName) {
            errors.displayName = 'Should be more than 4 characters'
        }
        if(!email) {
            errors.email = 'Check the format '
        }

        if(values.password && !password){
            errors.password = 'Should be more than 8 characters'
        }
        if(values.password && password){
            if(values.password !== values.passwordRepeat){
                errors.passwordRepeat = 'Password confirmation needs to match original password';
            }
        }

        if(values.passwordRepeat && !values.password){
            errors.password = 'Cannot be empty'
        }


    }catch (e) {
        return await Promise.reject(e)
    }


    if (Object.keys(errors).length === 0) {
        return await Promise.resolve()
    }else {
        return Promise.reject(errors)
    }

};


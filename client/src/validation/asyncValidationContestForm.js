import isEmpty from 'lodash/isEmpty';

import {ContestNameForm as contestForm} from '../utils/textAndLinksForPages/textAndLinksForPages'


const validateA = (value) => {

    return value.match(/^.{10,}$/) ? undefined : 'AAAAAAAAAAAAAAAAAAAAA';

}
const validateB = (value) => {
    return value.match(/^.{10,}$/) ? undefined : 'SBBBBBBBBBBB';
}
const validateC = (value) => {
    return value.match(/^.{10,}$/) ? undefined : 'CCCCCCCCCCCCCCCCC';
};

const contestFormFieldValidateMap = new Map([
    [contestForm.name[2].name, validateA],
    [contestForm.name[3].name, validateB],
    [contestForm.name[4].name, validateC],

]);


export const asyncValidationContestForm = async (values) => {
    const errors = {};
    const fields = Object.keys(values);
    fields.forEach(fieldName => {
        const validate = contestFormFieldValidateMap.get(fieldName);
        errors[fieldName] = validate? validate(values[fieldName]): undefined;
    });
    if (Object.keys(errors).length === 0) {
        return Promise.resolve()
    } else {
        return Promise.reject(errors)
    }
};



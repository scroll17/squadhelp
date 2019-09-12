import React from 'react';
import connect from "react-redux/es/connect/connect";

import {Field, reduxForm} from 'redux-form';

import style from './DrawContestForm.module.sass';

import ContestFields from '../ContestFields/ContestFields'

import { dataForTheContestForm } from '../../../../utils/textAndLinksForPages/textAndLinksForPages'


import { TYPE_FIELD } from "../../../../constants";

import { last, isObject } from 'lodash'

const validation = (value) => {
    // if(!value){
    //     return "Please fill this field"
    // }else if(value && !isObject(value)){
    //     const str = value.replace(/\s+/g, '');
    //     if(str.length === 0){
    //         return "Please fill this field"
    //     }
    // }
};


let DrawContestForm = (props) => {
    const { handleSubmit, contestStageNow } = props;


    const renderField = (fieldData) => {
        return <Field
                      {...fieldData}
                      key={fieldData.name}
                      dataSelect={dataForTheContestForm[TYPE_FIELD.SELECT]}
                      funcForValidate={validation}
                      validate={
                          fieldData.isRequired  ? validation : null
                      }
                      component={ContestFields}/>
    };

    const renderFields = (fields) => {
        const fieldsShown = [];

        fields.forEach(fieldData => {
            if(fieldData.belongsToForm.includes(contestStageNow)){
                fieldsShown.push(
                    renderField(fieldData)
                )
            }
        });

        return fieldsShown
    };
    return (
        <div className={style.clearFix}>
            <form onSubmit={handleSubmit}>
                {
                    renderFields(dataForTheContestForm['fields'])
                }
            </form>
        </div>
    )
};

DrawContestForm = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(DrawContestForm);

export default DrawContestForm = connect(state => {
    const { contestFormData, contestNow } = state.contestReducers;
    const contestStageNow = last(contestNow);

    return ({
        contestStageNow: contestStageNow,
        initialValues: contestFormData[contestStageNow],
    })
})(DrawContestForm)


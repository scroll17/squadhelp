import React, { useMemo } from 'react';
import connect from "react-redux/es/connect/connect";

import {Field, reduxForm} from 'redux-form';

import style from './DrawContestForm.module.sass';

import ContestFields from '../ContestFields/ContestFields'
import validation from "../../../../validation/contestFormValidation"

import { dataForTheContestForm } from '../../../../utils/textAndLinksForPages/textAndLinksForPages'

import { TYPE_FIELD, CONTEST_FIELDS } from "../../../../constants";

import { last } from 'lodash'

import convertNormalObjectToSelectInput from "../../../../utils/forms/convertNormalObjectToSelectInput";

let DrawContestForm = (props) => {
    const { handleSubmit, contestStageNow } = props;
    const fields = dataForTheContestForm['fields'];

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

    const renderFields = useMemo(() => {
        const fieldsShown = [];

        fields.forEach(fieldData => {
            if(fieldData.belongsToForm.includes(contestStageNow)){
                fieldsShown.push(
                    renderField(fieldData)
                )
            }
        });

        return fieldsShown
    }, [fields]);

    return (
        <div className={style.clearFix}>
            <form onSubmit={handleSubmit}>
                {renderFields}
            </form>
        </div>
    )
};

DrawContestForm = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(DrawContestForm);

export default DrawContestForm = connect( (state, props) => {

    const { contestFormData, contestNow } = state.contestReducer;
    const contestStageNow = last(contestNow);

    const initialValues = convertNormalObjectToSelectInput(props.initialValues, [CONTEST_FIELDS.TYPE_OF_VENTURE]);

    return ({
        contestStageNow: props.contestStageNow || contestStageNow,
        initialValues: initialValues || contestFormData[contestStageNow],
    })
})(DrawContestForm)


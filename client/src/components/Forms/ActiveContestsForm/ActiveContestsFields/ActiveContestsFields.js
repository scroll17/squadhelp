import React, {useMemo} from 'react';

import {Field} from 'redux-form';
import Select from 'react-select';

import style from './ActiveContestsFields.module.sass';

import {TYPE_FIELD} from "../../../../constants";

import { isEqual } from "lodash";

import { dataForActiveContestsForm } from "../../../../utils/textAndLinksForPages/textAndLinksForPages"


let ContestFields = ({dataSelect, input, ...props}) => {
    let fieldInput;

    const { type, dataType } = props;


    if(isEqual(type, TYPE_FIELD.SELECT)){
        fieldInput = <Select
            {...input}
            onBlur={() => input.onBlur()}
            options={dataSelect[dataType]}
            isMulti={props.isMulti}
        />
    }else{
        fieldInput = <input
            className={style.input}
            type={props.type}
            min={props.min}
            {...input}
        />
    }


    return fieldInput;

};


let ActiveContestFields = () => {

    const fieldsValue = dataForActiveContestsForm.fields;
    const fields = Object.keys(fieldsValue);

    const renderField = (fieldData) => {

        return <Field
            {...fieldData}
            key={fieldData.name}
            dataSelect={dataForActiveContestsForm[TYPE_FIELD.SELECT]}
            component={ContestFields}
        />
    };


    return useMemo(() => {
        const fieldsShown = [];

        fields.forEach(header => {
            const fieldsData = fieldsValue[header];

            fieldsShown.push(
                <div className={style.heading} key={header}>
                    {header}
                </div>
            );

            fieldsShown.push(
                <div className={style.filters} key={`${header}P`}>
                    {fieldsData.map(fieldData => renderField(fieldData))}
                </div>
            );
        });

        return fieldsShown
    }, [fieldsValue]);


};
export default React.memo(ActiveContestFields);

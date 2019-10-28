import React from 'react';
import style from './Input.module.sass';

import { Field } from 'redux-form';

function Input(props) {
    const {name, placeholder, names, type} = props;

    const setTouchedFields = (name) => props[names[name]].meta.touched;
    const setErrorFields = (name) => props[names[name]].meta.error;

    const setBorderStyleWithValidation = (touched, err) => {
        if(touched){
            return err ? ({border: '2px solid red'}) : ({border: '2px solid green'});
        }
    };

    const showErrorMessage = (setTouchedFields, setErrorFields) => {
        let errorMessage;

        if(setTouchedFields(0) && setErrorFields(0)){
            errorMessage = setErrorFields(0)
        }else if(setTouchedFields(1) && setErrorFields(1)){
            errorMessage = setErrorFields(1)
        }else{
            return null
        }

        return(
            <div className={style.errorContainer}>
                <p className={style.textError}>{errorMessage}</p>
            </div>
        )
    };

    return (
        <div className={style.row}>
            <div className={style.rowInputs}>
                <div className={style.fieldContainer}>
                    <Field name={name.one}
                           component="input"
                           type={type.one}
                           placeholder={placeholder.one}
                           style={setBorderStyleWithValidation(setTouchedFields(0), setErrorFields(0))}
                    />
                </div>
                <div className={style.fieldContainer}>
                    <Field name={name.two}
                           component="input"
                           type={type.two}
                           placeholder={placeholder.two}
                           style={setBorderStyleWithValidation(setTouchedFields(1), setErrorFields(1))}
                    />
                </div>
            </div>
            {showErrorMessage(setTouchedFields, setErrorFields) }
        </div>
    )
}
export default Input;

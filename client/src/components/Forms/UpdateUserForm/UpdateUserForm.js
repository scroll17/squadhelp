import React  from 'react';
import connect from "react-redux/es/connect/connect";

import style from "./UpdateUserForm.module.sass"

import { reduxForm, Field } from 'redux-form'

import { dataForUpdateUserForm } from "../../../utils/textAndLinksForPages/textAndLinksForPages"
import { FORM, TYPE_FIELD } from "../../../constants";

import { chunk } from "lodash";

import TextField from "./TextField/TextField";
import { asyncValidationUpdateUserForm } from "../../../validation/asyncValidationUpdateUserForm";

import { updateUserInformation } from "../../../actions/actionCreators/userActionCreator";

let UpdateUserForm = (props) => {

  const renderFields = () => {
        const doubleFields = [];

        dataForUpdateUserForm.forEach( fieldData => {
            doubleFields.push(
                <Field
                    {...fieldData}
                    component={TextField}
                    key={fieldData.name}
                />
            );
        });


        return chunk(doubleFields, 2).map( fields => {
            return (
                <div className={style.doubleField} key={fields[0].key}>
                    {fields}
                </div>
            )
        });

    };


    const toUpdateUserInformation = (value) => {
      props.updateUserInformation(value);
      props.closeEditing();

      reset()
    };

    const { handleSubmit, pristine, reset, submitting } = props;


    return (
        <div className={style.updateUser}>
            <form onSubmit={handleSubmit(toUpdateUserInformation)}>
                <div className={style.fields}>
                    {renderFields()}
                </div>
                <button
                    type={TYPE_FIELD.SUBMIT}
                    disabled={pristine || submitting}
                    className={style.button}
                >
                    Update
                </button>
            </form>
        </div>
    )
};

UpdateUserForm = reduxForm({
    form: FORM.UPDATE_USER,
    asyncValidate: asyncValidationUpdateUserForm,
    destroyOnUnmount: false,
    enableReinitialize: true,
})(UpdateUserForm);


const mapStateToProps = state => {
    const { firstName, lastName, displayName, email } = state.userReducer.user;

    return {
        initialValues: {
            firstName,
            lastName,
            displayName,
            email
        }
    }
};
const mapDispatchToProps = dispatch => ({
    updateUserInformation: (info) => dispatch(updateUserInformation(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserForm);

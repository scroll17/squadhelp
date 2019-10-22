import React, { useEffect } from 'react';
import connect from "react-redux/es/connect/connect";

import style from "./ActiveContestsForm.module.sass"

import ActiveContestsFields from './ActiveContestsFields/ActiveContestsFields';

import queryString from 'query-string'

import { useHistory } from "react-router-dom";
import useDebounce from "../../Hooks/useDebounce";

import { reduxForm, formValueSelector } from 'redux-form'

import { findContestsPyParams } from "../../../actions/actionCreators/dashboardContestsActionCreator";

import { FORM, ACTIVE_CONTEST_FORM_FIELDS, TYPE_FIELD } from "../../../constants";

import transformSelectInputToNormalObject from "../../../utils/transformSelectInputToNormalObject";

let ActiveContests = (props) => {

    const history = useHistory();

    const { formValue } = props;
    const { handleSubmit, pristine, reset, submitting } = props;

    const debouncedSearchTerm = useDebounce(formValue, 500);

    useEffect(() => {

        const queryObject = transformSelectInputToNormalObject(formValue);
        const queryParams = `?${queryString.stringify(queryObject,  {arrayFormat: 'bracket'})}`;

        history.replace({
            search: queryParams
        });

        props.findContestsPyParams(queryParams)

    }, [debouncedSearchTerm]);


    return (
        <div className={style.activeContestsForm}>
            <form onSubmit={handleSubmit}>
                <div>
                    <ActiveContestsFields />
                </div>
                <button
                    type={TYPE_FIELD.BUTTON}
                    disabled={pristine || submitting}
                    onClick={reset}
                    className={style.button}
                >
                    reset
                </button>
            </form>
        </div>
    )
};

ActiveContests = reduxForm({
    form: FORM.ACTIVE_CONTESTS,
    destroyOnUnmount: false
})(ActiveContests);

const selector = formValueSelector(FORM.ACTIVE_CONTESTS);
const mapStateToProps = state => ({
    formValue: {
        id: selector(state, ACTIVE_CONTEST_FORM_FIELDS.ID),
        price: selector(state, ACTIVE_CONTEST_FORM_FIELDS.PRICE),
        typeOfVenture: selector(state, ACTIVE_CONTEST_FORM_FIELDS.TYPE_OF_VENTURE),
        status: selector(state, ACTIVE_CONTEST_FORM_FIELDS.STATUS),
        contestType: selector(state, ACTIVE_CONTEST_FORM_FIELDS.CONTEST_TYPE),
    }
});

const mapDispatchToProps = dispatch => ({
    findContestsPyParams: params => dispatch(findContestsPyParams(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ActiveContests);

import React, { useEffect } from 'react';
import connect from "react-redux/es/connect/connect";

import style from "./ActiveContestsForm.module.sass"

import ActiveContestsFields from './ActiveContestsFields/ActiveContestsFields';

import queryString from 'query-string'

import { useHistory } from "react-router-dom";
import useDebounce from "../../Hooks/useDebounce";

import { reduxForm, formValueSelector } from 'redux-form'

import { findContestsPyParams } from "../../../actions/actionCreators/dashboardContestsActionCreator";

import { FORM } from "../../../constants";

import { values, omit } from "lodash";

let ActiveContests = (props) => {

    const history = useHistory();

    const { formValue } = props;
    const { handleSubmit, pristine, reset, submitting } = props;

    console.log(values(omit(formValue.typeOfVenture, 'label')))

    const debouncedSearchTerm = useDebounce(formValue, 500);

    useEffect(() => {
        const queryParams = `?${queryString.stringify(formValue,  {arrayFormat: 'bracket'})}`;

        history.replace({
            search: queryParams
        });

        props.findContestsPyParams(queryParams)

    }, [debouncedSearchTerm]);



    return (
        <div className={style.activeContestsForm}>
            <form onSubmit={handleSubmit}>
                <div className={style.boxFilters}>
                    <ActiveContestsFields />
                </div>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </form>
        </div>
    )
};

ActiveContests = reduxForm({
    form: FORM.ACTIVE_CONTESTS
})(ActiveContests);

const selector = formValueSelector(FORM.ACTIVE_CONTESTS);
const mapStateToProps = state => ({
    formValue: {
        id: selector(state, 'id'),
        price: selector(state, 'price'),
        typeOfVenture: selector(state, 'typeOfVenture'),
        type: selector(state, 'type'),
        status: selector(state, 'status'),
    }
});

const mapDispatchToProps = dispatch => ({
    findContestsPyParams: params => dispatch(findContestsPyParams(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ActiveContests);

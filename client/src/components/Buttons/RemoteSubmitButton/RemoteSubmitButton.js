import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

import { isEmpty , last } from 'lodash';


const SubmitButton = (props) => {
    const { dispatch, contestQueue, contestNow } = props;
    const formNow = last(contestNow);

    return (
        <button type="submit" onClick={() => dispatch(submit(formNow))} >
            {isEmpty(contestQueue) ? "Pay now" : "next"}
        </button>
    )
};
const mapStateToProps = (state) => ({
    contestNow: state.contestReducers.contestNow,
    contestQueue: state.contestReducers.contestQueue,
});
export default connect(mapStateToProps)(SubmitButton)
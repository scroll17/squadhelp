import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

const UpdateButton = (props) => {
    const { dispatch, formName } = props;

    return (
        <button type="submit" onClick={() => dispatch(submit(formName))} >
            Update
        </button>
    )
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(UpdateButton)
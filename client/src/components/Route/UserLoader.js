import React, {useEffect} from 'react';
import connect from "react-redux/es/connect/connect";

import {getUser} from "../../actions/actionCreators/userActionCreator";

import {TOKEN} from '../../constants'

function UserLoader(props) {
    useEffect(() => {
        if (!props.user && localStorage.getItem(TOKEN.ACCESS_TOKEN)) {
            props.getUser();
        }
    });

    return (
        <> {props.children} </>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
});
const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserLoader);

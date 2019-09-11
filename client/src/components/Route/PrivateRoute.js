import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import { getUser } from "../../actions/actionCreators/userActionCreator";
import { isEmpty } from 'lodash';

import { URL } from '../../api/baseURL'

class PrivateRoute extends Component{

    renderPage(){
        const { user, isFetching, requireRole, redirectTo, path, component} = this.props;

        if ((!requireRole.includes(user.role)) && isFetching === false){
            return <Redirect to={redirectTo} />;
        }
        return( <Route path={path} component={component}/> )
    }

    render(){
        const { user, redirectTo } = this.props;
        return(
            <>
                { user && this.renderPage() }
                { isEmpty(localStorage) && <Redirect to={redirectTo} /> }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
    isFetching: state.userReducers.isFetching
});
const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);


import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import { getUser } from "../../actions/actionCreators/userActionCreator";
import { isEmpty } from 'lodash';


class PrivateRoute extends Component{

    renderPage(){
        const { user, isFetching, requireRole, redirectTo, ...props} = this.props;

        if ((!requireRole.includes(user.role)) && isFetching === false){
            return <Redirect to={redirectTo} />;
        }
        return( <Route {...props}/> )
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
    user: state.userReducer.user,
    isFetching: state.userReducer.isFetching
});
const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);


import React, { Component, lazy } from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";

import connect from "react-redux/es/connect/connect";

import PrivateRoute from './PrivateRoute'

import { URL } from '../../api/baseURL'
import { ROLE } from '../../constants'

import WaitingComponent from "./WaitingComponent/WaitingComponent";


const MainHomePage = lazy(() => import('../../pages/MainHomePage/MainHomePage'));
const LoginPages = lazy(() => import('../../pages/LoginPages/LoginPages'));
const SignUpPage = lazy(() => import('../../pages/SignUpPage/SignUpPage'));
const AdminPage = lazy(() => import('../../pages/AdminPage/AdminPage'));
const ContestPage = lazy(() => import('../../pages/ContestPage/ContestPage'));
const DashboardPage = lazy(() => import('../../pages/DashboardPage/DashboardPage'));
const ModerationPage = lazy(() => import('../../pages/ModerationPage/ModerationPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));



class SwitchRouters extends Component{
    IfUserIsLoggedIn(Component){
        if(this.props.user){
            return () => <Redirect to={URL.HOME}/>
        }
        return WaitingComponent(Component)
    }

    render(){
        return(
            <Switch>
                <Route exact
                       path={URL.HOME}
                       component={WaitingComponent(MainHomePage)}
                />

                <Route path={URL.LOGIN}
                       component={this.IfUserIsLoggedIn(LoginPages)}/>

                <Route path={URL.SIGN_UP}
                       component={this.IfUserIsLoggedIn(SignUpPage)}/>

                <Route path={URL.CONTEST_TYPE}
                       component={WaitingComponent(ContestPage)}
                />


                <PrivateRoute
                    requireRole={Object.values(ROLE)}
                    path={URL.DASHBOARD}
                    component={WaitingComponent(DashboardPage)}
                    redirectTo={URL.LOGIN}
                />

                <PrivateRoute
                    requireRole={[ROLE.ADMIN]}
                    path={URL.ADMIN_PANEL}
                    component={WaitingComponent(AdminPage)}
                    redirectTo={URL.NOT_FOUND}
                />

                <PrivateRoute
                    requireRole={[ROLE.ADMIN]}
                    path={URL.MODERATION}
                    component={WaitingComponent(ModerationPage)}
                    redirectTo={URL.NOT_FOUND}
                />

                <Route component={WaitingComponent(NotFoundPage)} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
});
export default connect(mapStateToProps)(SwitchRouters);

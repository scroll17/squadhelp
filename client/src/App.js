import React, { Component, lazy } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";

import connect from "react-redux/es/connect/connect";
import history from "./boot/browserHistory";

import UserLoader from './components/Route/UserLoader';
import PrivateRoute from './components/Route/PrivateRoute'

import ChatPage from './pages/ChatPage/ChatPage'

import { URL } from './api/baseURL'
import { ROLE } from './constants'

import WaitingComponent from "./components/Route/WaitingComponent";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const MainHomePage = lazy(() => import('./pages/MainHomePage/MainHomePage'));
const LoginPages = lazy(() => import('./pages/LoginPages/LoginPages'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));
const ContestPage = lazy(() => import('./pages/ContestPage/ContestPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const ModerationPage = lazy(() => import('./pages/ModerationPage/ModerationPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));



history.listen( _ => {
    window.scrollTo(0, 0)
});

class App extends Component{
    IfUserIsLoggedIn(Component){
        if(this.props.user){
            return () => <Redirect to={URL.HOME}/>
        }
        return WaitingComponent(Component)
    }

    render(){
        return(
            <UserLoader>
                <ErrorBoundary >
                    <Router history={history}>
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
                                    render={props => <DashboardPage {...props}/>}
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
                    </Router>

                    {this.props.user && <ChatPage />}
                </ErrorBoundary>
            </UserLoader>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
});
export default connect(mapStateToProps)(App);

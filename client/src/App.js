import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";

import connect from "react-redux/es/connect/connect";
import history from "./boot/browserHistory";


import MainHomePage from './pages/MainHomePage/MainHomePage';
import LoginPages from './pages/LoginPages/LoginPages';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import AdminPage from './pages/AdminPage/AdminPage';
import ContestPage from './pages/ContestPage/ContestPage';
import DashboardPage from './pages/DashboardPage/DashboardPage'

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import UserLoader from './components/Route/UserLoader';
import PrivateRoute from './components/Route/PrivateRoute'

import ChatPage from './pages/ChatPage/ChatPage'

import { URL } from './api/baseURL'
import { ROLE } from './constants'


history.listen( _ => {
    window.scrollTo(0, 0)
});

class App extends Component{
    IfUserIsLoggedIn(component){
        if(this.props.user){
            return () => <Redirect to={URL.HOME}/>
        }
        return component
    }

    render(){
        return(
            <UserLoader>
                <Router history={history}>
                    <Switch>
                        <Route exact path={URL.HOME}  component={MainHomePage}/>

                        <Route path={URL.LOGIN}
                               component={this.IfUserIsLoggedIn(LoginPages)}/>

                        <Route path={URL.SIGN_UP}
                               component={this.IfUserIsLoggedIn(SignUpPage)}/>

                        <Route path={URL.CONTEST_TYPE} component={ContestPage} />

                        <Route path={URL.DASHBOARD} component={DashboardPage} />

                        <PrivateRoute requireRole={ROLE.ADMIN} path={URL.ADMIN_PANEL} component={AdminPage} />

                        <Route component={ NotFoundPage } />
                    </Switch>
                </Router>

                {this.props.user && <ChatPage />}
            </UserLoader>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
});
export default connect(mapStateToProps)(App);

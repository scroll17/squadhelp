import React, {Component} from 'react';
import {Router} from "react-router-dom";

import connect from "react-redux/es/connect/connect";
import history from "./boot/browserHistory";

import ChatPage from './pages/ChatPage/ChatPage'

import UserLoader from './components/Route/UserLoader';
import SwitchRouters from './components/Route/SwitchRouters';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";


history.listen(_ => {
    window.scrollTo(0, 0)
});



class App extends Component {

    render() {
        return (
            <UserLoader>
                <ErrorBoundary>

                    <Router history={history}>
                        <SwitchRouters/>
                    </Router>

                    {this.props.user && <ChatPage/>}

                </ErrorBoundary>
            </UserLoader>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
});
export default connect(mapStateToProps)(App);

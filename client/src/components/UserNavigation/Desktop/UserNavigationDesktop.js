import React from 'react';
import connect from "react-redux/es/connect/connect";

import style from './UserNavigationDesktop.module.sass';

import ContactsDetails from './ContactsDetails/ContactsDetails'
import LoginSignUp from './LoginSignUp/LoginSignUp'
import UserMenu from '../UserMenu/UserMenu'

import { VIEW } from "../../../constants";

function UserNavigationDesktop(props) {
    return (
        <header className={style.header}>
            <div className={style.headerTop}>
                <div className={style.container}>
                    <ContactsDetails />
                    {props.user ? <UserMenu view={VIEW.DESKTOP}/> : <LoginSignUp />}
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user
});
export default connect(mapStateToProps)(UserNavigationDesktop);

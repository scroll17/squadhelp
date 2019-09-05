import React from 'react';
import style from './UserSearch.module.sass'

import connect from "react-redux/es/connect/connect";

import { Field } from 'redux-form';

import { findUsers, startConversation } from "../../../api/socket/chatController";

function Header(props){
    const { resetField, fieldName, foundUsers } = props;

    const findParticipants = (e) => {
        if(e.target.value){
            findUsers({ data: e.target.value })
        }
    };

    const showFoundUsers = (users) => {
        return users.map( user => {
            const {id, displayName, role} = user;
            return(
                <li className={style.user} key={id} onClick={() => startConversation(id)}>
                    <div className={style.iconUser} />
                    <div className={style.userInformation}>
                        <span className={style.userName}>{displayName}</span>
                        <span className={style.userRole}>{role}</span>
                    </div>
                </li>
            )
        })
    };

    return(
            <div className={style.searchContainer}>
                <div className={style.search}>
                    <i className="fas fa-search" />
                    <Field
                        name={fieldName}
                        type={'text'}
                        component={'input'}
                        onChange={findParticipants} />
                    <i className="far fa-times-circle" onClick={() => resetField(fieldName)}/>
                </div>
                {foundUsers &&
                    <ul className={style.foundUsers}>
                        {showFoundUsers(foundUsers)}
                    </ul>
                }
            </div>
    )
}

const mapStateToProps = (state) => ({
    foundUsers: state.chatReducers.foundUsers,
});
export default connect(mapStateToProps)(Header);


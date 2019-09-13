import React from 'react';
import style from './FindUsers.module.sass'

import connect from "react-redux/es/connect/connect";

import User from "./User/User";

import { Field } from 'redux-form';

import { findUsers } from "../../../api/socket/chatController";

function FindUsers(props){
    const { resetField, fieldName, foundUsers, user } = props;

    const findParticipants = (e) => {
        if(e.target.value){
            findUsers({ data: e.target.value })
        }
    };

    const showFoundUsers = (foundUsers) => {
        return foundUsers.map( foundUser => (
            <User
                {...user}
                key={foundUser.id}
                userId={user.id}
                clickToResetField={() => resetField(fieldName)}
            />
        ))
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
    foundUsers: state.chatFindReducer.foundUsers,
    user: state.userReducers.user,
});
export default connect(mapStateToProps)(FindUsers);


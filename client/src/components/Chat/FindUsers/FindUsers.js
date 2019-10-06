import React, { useMemo } from 'react';
import style from './FindUsers.module.sass'

import connect from "react-redux/es/connect/connect";

import User from "./User/User";

import { Field } from 'redux-form';

import { findUsers } from "../../../api/socket/chatController";

function FindUsers(props){
    const { resetField, fieldName, foundUsers } = props;

    const findParticipants = (e) => {
        if(e.target.value){
            findUsers({ data: e.target.value })
        }
    };

    const showFoundUsers = useMemo(() => {
        return foundUsers.map( foundUser => (
            <User
                {...foundUser}
                key={foundUser.id}
                clickToResetField={() => resetField(fieldName)}
            />
        ))
    }, [foundUsers]);

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
                        {showFoundUsers}
                    </ul>
                }
            </div>
    )
}

const mapStateToProps = (state) => ({
    foundUsers: state.chatFindReducer.foundUsers,
});
export default connect(mapStateToProps)(FindUsers);


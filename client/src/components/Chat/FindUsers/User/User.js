import React from 'react';
import style from './User.module.sass'

import {startConversation} from "../../../../api/socket/chatController";

function User(props) {
    const {id, displayName, role, clickToResetField} = props;

    return (
        <li className={style.user} key={id}
            onClick={() => {
                clickToResetField();
                return startConversation({id, displayName})
            }}
        >
            <div className={style.iconUser}/>
            <div className={style.userInformation}>
                <span className={style.userName}>{displayName}</span>
                <span className={style.userRole}>{role}</span>
            </div>
        </li>
    )
}

export default User;


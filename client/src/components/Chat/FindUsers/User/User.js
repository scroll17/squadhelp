import React from 'react';
import style from './User.module.sass'

import {startConversation} from "../../../../api/socket/chatController";

import Avatar from "../../../Avatart/Avatar";

function User(props) {
    const {id, displayName, role, avatar, clickToResetField} = props;

    return (
        <li className={style.user} key={id}
            onClick={() => {
                clickToResetField();
                return startConversation({id, displayName, avatar})
            }}
        >
            <Avatar
                size={45}
                customAvatar={avatar}
                customStyle={{marginRight: "12px"}}
            />
            <div className={style.userInformation}>
                <span className={style.userName}>{displayName}</span>
                <span className={style.userRole}>{role}</span>
            </div>
        </li>
    )
}

export default User;


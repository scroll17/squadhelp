import React from 'react';
import style from './LastMessage.module.sass'

import connect from "react-redux/es/connect/connect";

import {isEqual} from "lodash";


function LastMessage(props){
    const { message, user } = props;
    const { ownerId, content } = message;

    const isYouMessage = isEqual(ownerId, user.id);

    const unreadMessage = () => {
        if(message.notRead){
            return <span className={style.notReadMessage}>{content}</span>
        }else{
            return <span>{content}</span>
        }
    };

    return(
        <div className={style.message}>
            {isYouMessage && <span className={style.youMessage}>You:</span>}
            {unreadMessage()}
        </div>
    )

}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
});
export default connect(mapStateToProps)(LastMessage);
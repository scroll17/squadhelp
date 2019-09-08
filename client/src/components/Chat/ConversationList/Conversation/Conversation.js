import React from 'react';
import style from './Conversation.module.sass'

import connect from "react-redux/es/connect/connect";

import {isEqual} from "lodash";

import {openConversation} from "../../../../actions/actionCreators/chatActionCreator";

import {joinToRoom} from "../../../../api/socket/chatController";

let Conversation = (props) => {
    const { user, conversation } = props;
    const {title, _id, lastMessage: {time, content, ownerId} } = conversation;

    const openConversation = (conversation) => {
        props.openConversation(conversation);
        return joinToRoom(conversation._id)
    };

    const isYouMessage = isEqual(ownerId, user.id);
    return (
        <li className={style.conversation} key={_id} onClick={() => openConversation({title, _id})}>
            <div className={style.icon}/>
            <div className={style.conversationName}>
                <span className={style.title}>{title}</span>
                <span className={style.message}>
                            {isYouMessage && <span className={style.youMessage}>You:</span>}
                    {content}
                        </span>
            </div>
            <div className={style.date}>10:00 AM</div>
        </li>
    )
};

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
});
const mapDispatchToProps = dispatch => ({
    openConversation: (conversationId) => dispatch(openConversation(conversationId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
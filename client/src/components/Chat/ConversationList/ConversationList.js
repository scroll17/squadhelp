import React from 'react';
import style from './ConversationList.module.sass'

import connect from "react-redux/es/connect/connect";

import { isEqual } from "lodash";

import { openConversation } from "../../../actions/actionCreators/chatActionCreator";

import { joinToRoom } from "../../../api/socket/chatController";

let ConversationList = (props) => {
    const { user, conversations } = props;
    const openConversation = (conversation) => {
        props.openConversation(conversation);
        return joinToRoom(conversation._id)
    };

    const showListConversations = (conversations) => {
        return conversations.map( conversation => {
            const { title, _id, lastMessage: { time, content, ownerId } } = conversation;
            const isYouMessage = isEqual(ownerId, user.id);
            return(
                <li className={style.conversation} key={_id} onClick={() => openConversation(conversation)}>
                    <div className={style.icon} />
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
        })
    };
    return(
        <ul className={style.currentConversation}>
            {showListConversations(conversations)}
        </ul>
    )
};

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
    conversations: state.chatReducers.conversations,
});
const mapDispatchToProps = dispatch => ({
    openConversation: (conversationId) => dispatch(openConversation(conversationId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);
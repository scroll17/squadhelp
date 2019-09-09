import React from 'react';
import style from './Conversation.module.sass'

import connect from "react-redux/es/connect/connect";

import timeConversion from "../../../../utils/timeConversion";

import {openConversation} from "../../../../actions/actionCreators/chatActionCreator";

import {joinToRoom} from "../../../../api/socket/chatController";
import LastMessage from "../LastMessage/LastMessage";

let Conversation = (props) => {
    const {title, _id, lastMessage } = props.conversation;

    const openConversation = (conversation) => {
        props.openConversation(conversation);
        return joinToRoom(conversation._id)
    };

    return (
        <li className={style.conversation}
            key={_id}
            onClick={() => openConversation({title, _id, participantId: lastMessage.ownerId})}
        >
            <div className={style.icon}/>
            <div className={style.conversationName}>
                <span className={style.title}>{title}</span>
                <LastMessage message={lastMessage}/>
            </div>
            <div className={style.date}>
                {timeConversion(lastMessage.time)}
            </div>
        </li>
    )
};

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = dispatch => ({
    openConversation: (conversationId) => dispatch(openConversation(conversationId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
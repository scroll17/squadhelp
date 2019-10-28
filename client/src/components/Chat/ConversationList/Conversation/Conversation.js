import React from 'react';
import style from './Conversation.module.sass'

import connect from "react-redux/es/connect/connect";

import timeConversion from "../../../../utils/moment/timeConversion";

import {openConversation} from "../../../../actions/actionCreators/chatActionCreator";

import {joinToRoom} from "../../../../api/socket/chatController";
import LastMessage from "../LastMessage/LastMessage";
import Avatar from "../../../Avatart/Avatar";

let Conversation = (props) => {
    const {title, _id, lastMessage, avatar, participant } = props.conversation;

    const openConversation = (conversation) => {
        props.openConversation(conversation);
        return joinToRoom(conversation._id)
    };

    return (
        <li className={style.conversation}
            key={_id}
            onClick={() => openConversation({avatar, title, _id, participantId: participant})}
        >
            <Avatar
                size={45}
                customAvatar={avatar}
                customStyle={{marginRight: "12px"}}
            />
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
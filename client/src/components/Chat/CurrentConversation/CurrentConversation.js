import React  from 'react';
import style from './CurrentConversation.module.sass'

import connect from "react-redux/es/connect/connect";

import { isEqual } from 'lodash'

function ConversationList(props){
    const { messages, user } = props;

    const styleForParticipants = {
        messageStyle: {
            alignSelf: "flex-start",
            padding: "0",
            paddingRight: "60px",
            float: 'left'
        },
        timeContainer: {
            left: "100%",
            padding: "0",
            width: "40px",
            marginLeft: "-60px"
        },
        messageContent: {
            backgroundColor: "#f1f1f1"
        }
    };

    const showMessages = (messages) => {
        return messages.map( message => {
            const { messageStyle, timeContainer, messageContent} = styleForParticipants;
            const participantsMessage = isEqual(message.ownerId, user.id) ? null : true;
            return (
                <div className={style.message} key={message.time} style={participantsMessage && messageStyle}>
                    <div className={style.timeContainer} style={participantsMessage && timeContainer}>
                        <span className={style.time}>1:20 AM</span>
                    </div>
                    <div className={style.messageContent} style={participantsMessage && messageContent}>
                        <span className={style.content}>{message.content}</span>
                    </div>
                </div>
            )
        })
    };

    return(
        <div className={style.messages}>
            {showMessages(messages)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
    messages: state.chatReducers.messages,
});
export default connect(mapStateToProps)(ConversationList);


import React from 'react';
import style from './Messages.module.sass'

import connect from "react-redux/es/connect/connect";

import {isEqual} from 'lodash'

import timeConversion from "../../../../utils/moment/timeConversion";

function Messages(props) {
    const { message, user } = props;


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

    const { messageStyle, timeContainer, messageContent } = styleForParticipants;
    const participantsMessage = isEqual(message.ownerId, user.id) ? null : true;

    return (
        <div className={style.message} key={message.time} style={participantsMessage && messageStyle}>
            <div className={style.timeContainer} style={participantsMessage && timeContainer}>
                <span className={style.time}>{timeConversion(message.time, 'conversation')}</span>
            </div>
            <div className={style.messageContent} style={participantsMessage && messageContent}>
                <span className={style.content}>{message.content}</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
});
export default connect(mapStateToProps)(Messages);



import React, { useEffect, useRef }  from 'react';
import style from './CurrentConversation.module.sass'

import connect from "react-redux/es/connect/connect";

import Conversation from "./Messages/Messages";

import { isEmpty } from 'lodash'

function ConversationList(props){
    const { messages, participantIsTyping, openConversation } = props;
    const messageContainer = useRef(null);

    useEffect( () => {
        messageContainer.current.scrollTop =  messageContainer.current.scrollHeight
    });


    return(
        <div className={style.messages} ref={messageContainer}>
            { isEmpty(messages) ?
                <div className={style.noMessages}>
                    No messages here yet...
                </div>
                :
                messages.map( message => <Conversation message={message} key={message.time}/>)
            }
            {participantIsTyping && <span className={style.isTyping}>{openConversation.title} typing...</span>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    messages: state.chatMessagesReducer.messages,
    openConversation: state.chatConversationsReducer.openConversation,
    participantIsTyping: state.chatConversationsReducer.participantIsTyping,
});
export default connect(mapStateToProps)(ConversationList);


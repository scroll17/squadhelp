import React, { useLayoutEffect, useRef, useMemo }  from 'react';
import style from './CurrentConversation.module.sass'

import connect from "react-redux/es/connect/connect";

import Conversation from "./Messages/Messages";

import { isEmpty, isEqual } from 'lodash'

function ConversationList(props){
    const { messages, participantTyping, openConversation } = props;
    const messageContainer = useRef(null);

    useLayoutEffect( () => {
        messageContainer.current.scrollTop =  messageContainer.current.scrollHeight
    });

    const participantStartTyping = useMemo(() => {
        if(participantTyping && isEqual(openConversation.participantId, participantTyping)){
            return(
                <div className={style.isTyping}>
                    {openConversation.title} typing...
                </div>
            )
        }
    }, [participantTyping]);

    const messagesInConversation = useMemo(() => {
        return messages.map( message => <Conversation message={message} key={message.time}/>)
    }, [messages]);

    return(
        <div className={style.messages} ref={messageContainer}>
            { isEmpty(messages) ?
                <div className={style.noMessages}>
                    No messages here yet...
                </div>
                :
                messagesInConversation
            }
            {participantStartTyping}
        </div>
    )
}

const mapStateToProps = (state) => ({
    messages: state.chatMessagesReducer.messages,
    openConversation: state.chatConversationsReducer.openConversation,
    participantTyping: state.chatConversationsReducer.participantTyping,
});
export default connect(mapStateToProps)(ConversationList);


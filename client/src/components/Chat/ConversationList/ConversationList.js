import React, { useMemo } from 'react';
import style from './ConversationList.module.sass'

import connect from "react-redux/es/connect/connect";

import Conversation from "./Conversation/Conversation";

import { isEmpty } from "lodash";

let ConversationList = (props) => {
    const { conversations } = props;


    const showConversation = useMemo(() => {
        if(isEmpty(conversations)){
            return null
        }else{
            return conversations.map( conversation => (
                <Conversation
                    conversation={conversation}
                    key={conversation._id}
                />
            ))
        }
    }, [conversations]);

    return(
        <ul className={style.currentConversation}>
            {showConversation}
        </ul>
    )
};

const mapStateToProps = (state) => ({
    conversations: state.chatConversationsReducer.conversations,
});
export default connect(mapStateToProps)(ConversationList);
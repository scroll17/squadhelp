import React from 'react';
import style from './ConversationList.module.sass'

import connect from "react-redux/es/connect/connect";

import Conversation from "./Conversation/Conversation";

import { isEmpty } from "lodash";

let ConversationList = (props) => {
    const { conversations } = props;

    const showConversation = (conversations) => {
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
    };

    return(
        <ul className={style.currentConversation}>
            {showConversation(conversations)}
        </ul>
    )
};

const mapStateToProps = (state) => ({
    conversations: state.chatConversationsReducer.conversations,
});
export default connect(mapStateToProps)(ConversationList);
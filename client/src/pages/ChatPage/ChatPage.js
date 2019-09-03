import React from 'react';

import connect from "react-redux/es/connect/connect";

import style from './ChatPage.module.sass';

import Chat from '../../components/Chat/Chat'
import OpenChatButton from '../../components/Chat/OpenChatButton/OpenChatButton'

function ChatPage(props){
    const { chatIsOpen } = props;
    return(
       <div className={style.chatContainer}>
           {chatIsOpen && <Chat />}
           <OpenChatButton />
       </div>
    )
}

const mapStateToProps = (state) => ({
    chatIsOpen: state.chatReducers.isOpen,
});
export default connect(mapStateToProps)(ChatPage);


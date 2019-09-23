import React, { useEffect } from 'react';

import connect from "react-redux/es/connect/connect";

import style from './ChatPage.module.sass';

import Chat from '../../components/Chat/Chat'
import OpenChatButton from '../../components/Chat/OpenChatButton/OpenChatButton'

import socket, {userConnected} from "../../api/socket/chatController";
import { omit } from 'lodash'

function ChatPage(props){
    const { chatIsOpen, user } = props;

    useEffect(() => {
        socket.connect();
        userConnected(omit(user, ['email', 'isBanned']));

        return () => socket.disconnect()
    }, []);

    return(
       <div className={style.chatContainer}>
           {chatIsOpen && <Chat />}
           <OpenChatButton />
       </div>
    )
}

const mapStateToProps = (state) => ({
    chatIsOpen: state.chatReducer.isOpen,
    user: state.userReducer.user,
});
export default connect(mapStateToProps)(ChatPage);


import React, { useEffect } from 'react';

import connect from "react-redux/es/connect/connect";

import style from './ChatPage.module.sass';

import Chat from '../../components/Chat/Chat'
import OpenChatButton from '../../components/Chat/OpenChatButton/OpenChatButton'

import { USER_DATA_FIELDS } from "../../constants";
import socket, {userConnected} from "../../api/socket/chatController";
import { omit } from 'lodash'

function ChatPage(props){
    const { chatIsOpen, user } = props;
    const { EMAIL, IS_BANNED } = USER_DATA_FIELDS;


    useEffect(() => {
        socket.connect();
        userConnected(omit(user, [EMAIL, IS_BANNED]));

        return () => socket.disconnect()
    }, []);

    useEffect(() => {
        const bodyPosition = document.body.style.position;

        if(chatIsOpen && document.body.clientWidth <= 775){
            document.body.style.position = "fixed";
        }

        if (!chatIsOpen && bodyPosition === "fixed"){
            document.body.style.position = "initial"
        }

    }, [chatIsOpen]);

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


import React from 'react';
import style from './OpenChatButton.module.sass'

import connect from "react-redux/es/connect/connect";

import { closeOrOpenChat } from "../../../actions/actionCreators/chatActionCreator";

function OpenChatButton(props){
    const { chatIsOpen, closeOrOpenChat } = props;

    return(
        <div className={style.OpenChatButton} onClick={() => closeOrOpenChat(chatIsOpen)}>
            { chatIsOpen ?
                <i className="fas fa-times" />
                :
                <i className="fab fa-telegram-plane" />
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    chatIsOpen: state.chatReducer.isOpen,
});
const mapDispatchToProps = dispatch => ({
    closeOrOpenChat: (chatIsOpen) => dispatch(closeOrOpenChat(chatIsOpen)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OpenChatButton);


import React from 'react';
import style from './OpenChatButton.module.sass'

import connect from "react-redux/es/connect/connect";

import { closeOrOpenConnection } from "../../../actions/actionCreators/chatActionCreator";

function OpenChatButton(props){
    const { chatIsOpen, closeOrOpenConnection } = props;

    return(
        <div className={style.OpenChatButton} onClick={() => closeOrOpenConnection(chatIsOpen)}>
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
    closeOrOpenConnection: (chatIsOpen) => dispatch(closeOrOpenConnection(chatIsOpen)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OpenChatButton);


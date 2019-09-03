import React from 'react';
import style from './OpenChatButton.module.sass'

import connect from "react-redux/es/connect/connect";
import {closeOrOpenChat} from "../../../actions/actionCreator";

function OpenChatButton(props){
    const { chatIsOpen } = props;

    return(
        <div className={style.OpenChatButton} onClick={props.closeOrOpenChat}>
            { chatIsOpen ?
                <i className="fas fa-times" />
                :
                <i className="fab fa-telegram-plane" />
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    chatIsOpen: state.chatReducers.isOpen,
});
const mapDispatchToProps = dispatch => ({
    closeOrOpenChat: () => dispatch(closeOrOpenChat()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OpenChatButton);


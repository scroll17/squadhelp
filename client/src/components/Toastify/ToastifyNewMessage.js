import React from 'react'
import { toast } from 'react-toastify';

import {HEX_COLOR, STORE} from "../../constants";
import CHAT_ACTION from "../../actions/actionTypes/chatActionsTypes";

export default function ToastifyNewMessage(){
    const displayMessage = () => {
        toast.dismiss();
        return STORE.dispatch({type: CHAT_ACTION.CLOSE_OR_OPEN_CHAT, isOpen: false});
    };

    const spanStyle = {
        padding: '3px',
        background: HEX_COLOR.WHITE,
        color: HEX_COLOR.SOFT_GREEN,
    };

    return (
        <div>
            New Message <span style={spanStyle} onClick={displayMessage}>View message</span>
        </div>
    );
};
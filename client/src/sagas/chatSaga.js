import ACTION from "../actions/actiontsTypes";
import {  } from "../api/rest/restContoller";

import { socket } from "../api/socket/chatController";

import { put } from 'redux-saga/effects';


export function* closeOrOpenConnectionSaga({isOpen}) {
    try {

        if(isOpen){
            socket.disconnect()
        }else{
            socket.connect();
        }

        yield put({type: ACTION.CLOSE_OR_OPEN_CHAT, isOpen: !isOpen});
    } catch (e) {
        yield put({type: ACTION.CHAT_ERROR, error: e})
    }
}
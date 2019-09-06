import CHAT_ACTION from "../actions/actionTypes/chatActionsTypes";
import { userConnected } from "../api/socket/chatController";

import socket from "../api/socket/chatController";

import { put, select } from 'redux-saga/effects';
import { omit, cloneDeep } from 'lodash'


export function* closeOrOpenConnectionSaga({isOpen}) {
    try {
        if(isOpen){
            yield put({type: CHAT_ACTION.CLEAR_STORE});
            socket.disconnect()
        }else{
            const {userReducers: { user }} = yield select();

            socket.connect();
            userConnected(omit(user, ['email', 'isBanned']))
        }

        yield put({type: CHAT_ACTION.CLOSE_OR_OPEN_CHAT, isOpen: !isOpen});
    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}

export function* closeStageFindUsersSaga({nextStage}) {
    try {
        yield put({type: CHAT_ACTION.TO_NEXT_CHAT_STAGE, nextStage});
        yield put({type: CHAT_ACTION.CLEAR_FOUND_USERS});
    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}

export function* addNewMessageSaga({message}) {
    try {
        const {chatReducers: { messages: oldMessages }} = yield select();
        const newMessages = cloneDeep(oldMessages);

        newMessages.push(message);


        yield put({type: CHAT_ACTION.NEW_MESSAGE, messages: newMessages});
    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}
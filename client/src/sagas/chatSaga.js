import CHAT_ACTION from "../actions/actionTypes/chatActionsTypes";
import { userConnected } from "../api/socket/chatController";

import socket from "../api/socket/chatController";

import { put, select } from 'redux-saga/effects';
import { omit, cloneDeep } from 'lodash'

import { STAGE_OF_CHAT } from '../constants/chatConst'

import { joinToRoom } from "../api/socket/chatController";

export function* closeOrOpenConnectionSaga({isOpen}) {
    try {
        if(isOpen){
            //yield put({type: CHAT_ACTION.CLEAR_STORE});
            socket.disconnect()
        }else{
            const {userReducers: { user }, chatConversationsReducer: { openConversation }} = yield select();

            socket.connect();
            userConnected(omit(user, ['email', 'isBanned']));

            if(openConversation){
                joinToRoom(openConversation._id)
            }
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

export function* openConversationSaga() {
    try {
        yield put({type: CHAT_ACTION.TO_NEXT_CHAT_STAGE, nextStage: STAGE_OF_CHAT.CONVERSATION});
        yield put({type: CHAT_ACTION.CLEAR_FOUND_USERS});
    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}
export function* closeConversationSaga() {
    try {
        yield put({type: CHAT_ACTION.TO_NEXT_CHAT_STAGE, nextStage: STAGE_OF_CHAT.BEGIN});
        yield put({type: CHAT_ACTION.CLEAR_MESSAGES});
    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}

export function* newMessageSaga({message}) {
    try {
        const {chatMessagesReducer: { messages: oldMessages }} = yield select();
        const newMessages = cloneDeep(oldMessages);

        newMessages.push(message);

        yield put({type: CHAT_ACTION.ADD_MESSAGES, messages: newMessages});
    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}
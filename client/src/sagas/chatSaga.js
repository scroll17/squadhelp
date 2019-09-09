import CHAT_ACTION from "../actions/actionTypes/chatActionsTypes";
import { userConnected } from "../api/socket/chatController";

import socket from "../api/socket/chatController";

import { put, select } from 'redux-saga/effects';
import { omit, cloneDeep, isEqual, last } from 'lodash'

import { STAGE_OF_CHAT } from '../constants/chatConst'

import { joinToRoom } from "../api/socket/chatController";

export function* closeOrOpenConnectionSaga({isOpen}) {
    try {
        if(isOpen){
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
        // const {chatConversationsReducer: { conversations: oldConversations, openConversation }} = yield select();
        //
        // const newConversations = cloneDeep(oldConversations);
        // newConversations.forEach( conversation => {
        //     if(isEqual(conversation._id, openConversation._id)){
        //         if(conversation.notRead){
        //             delete conversation.notRead
        //         }
        //     }
        // });
        // yield put({type: CHAT_ACTION.SHOW_CONVERSATIONS, conversations: newConversations});

        yield put({type: CHAT_ACTION.TO_NEXT_CHAT_STAGE, nextStage: STAGE_OF_CHAT.CONVERSATION});
        yield put({type: CHAT_ACTION.CLEAR_FOUND_USERS});
    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}
export function* closeConversationSaga({openConversation}) {
    try {

        const {chatConversationsReducer: { conversations }, chatMessagesReducer: { messages }} = yield select();

        const newConversations = cloneDeep(conversations);
        newConversations.forEach( conversation => {
            if(isEqual(conversation._id, openConversation._id)){
                conversation['lastMessage'] = last(messages);
            }
        });

        yield put({type: CHAT_ACTION.SHOW_CONVERSATIONS, conversations: newConversations});
        yield put({type: CHAT_ACTION.TO_NEXT_CHAT_STAGE, nextStage: STAGE_OF_CHAT.BEGIN});
        yield put({type: CHAT_ACTION.CLEAR_MESSAGES});
    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}

export function* addNewConversationSaga() {
    try {
        const {chatConversationsReducer: { conversations: oldConversations, openConversation }} = yield select();


        const newConversations = cloneDeep(oldConversations);
        newConversations.push(openConversation);


        yield put({type: CHAT_ACTION.ADD_CONVERSATION, conservations: newConversations});
    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}


export function* newMessageSaga({message}) {
    try {
        const {
            chatMessagesReducer: { messages: oldMessages },
            chatConversationsReducer: { openConversation, conversations: oldConversation }
        } = yield select();

        if(openConversation){
            const newMessages = cloneDeep(oldMessages);
            newMessages.push(message);

            yield put({type: CHAT_ACTION.ADD_MESSAGES, messages: newMessages});
        }else{
            const newConversations = cloneDeep(oldConversation);
            newConversations.forEach( conversation => {
                if(isEqual(conversation._id, message.conversationId)){
                    conversation['lastMessage'] = { ...message, notRead: true};
                }
            });

            yield put({type: CHAT_ACTION.SHOW_CONVERSATIONS, conversations: newConversations});
        }

    } catch (e) {
        yield put({type: CHAT_ACTION.CHAT_ERROR, error: e})
    }
}
import io from 'socket.io-client';

import CHAT_ACTIONS from '../../actions/actionTypes/chatActionsTypes'

import { STORE } from "../../constants/index";


import { baseURL } from "../baseURL";

const socket = io(baseURL, {
    autoConnect: false
});
export default socket;

const SOCKET_EVENTS = {
    USER_CONNECTED: 'user connected',
    SHOW_CONVERSATIONS: 'show conversations',

    FIND_USERS: 'find users',
    FOUND_USERS: 'found users',

    START_A_CONVERSATION: "start a conversation",

    JOIN_TO_ROOM: 'join to room',
    LEAVE_THE_ROOM: "leave the room",

    NEW_MESSAGE: 'new message',
};

export const userConnected = (user) => socket.emit(SOCKET_EVENTS.USER_CONNECTED, user);
socket.on(SOCKET_EVENTS.SHOW_CONVERSATIONS, conservations => STORE.dispatch({
    type: CHAT_ACTIONS.SHOW_CONVERSATIONS,
    conservations
}));

export const findUsers = (displayName) => socket.emit(SOCKET_EVENTS.FIND_USERS, displayName);
socket.on(SOCKET_EVENTS.FOUND_USERS, users => STORE.dispatch({
    type: CHAT_ACTIONS.FOUND_USERS,
    users
}));

export const startConversation = (id) => socket.emit(SOCKET_EVENTS.START_A_CONVERSATION, id);
export const joinToRoom = (roomId) => socket.emit(SOCKET_EVENTS.JOIN_TO_ROOM, roomId);
socket.on(SOCKET_EVENTS.JOIN_TO_ROOM, conversation => STORE.dispatch({
    type: CHAT_ACTIONS.OPEN_CONVERSATION,
    conversation
}));


export const leaveTheRoom = () => socket.emit(SOCKET_EVENTS.LEAVE_THE_ROOM);

export const sendMessage = (content) => socket.emit(SOCKET_EVENTS.NEW_MESSAGE, content);
socket.on(SOCKET_EVENTS.NEW_MESSAGE, message => STORE.dispatch({
    type: CHAT_ACTIONS.ADD_NEW_MESSAGE,
    message
}));
/*
export const sendMessage = (room, data) => socket.emit(SOCKET_EVENTS.CHAT_MESSAGE,room, data);
*/


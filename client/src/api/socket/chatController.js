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

    START_CONVERSATION: "start conversation",

    JOIN_TO_ROOM: 'join to room',
    LEAVE_THE_ROOM: "leave the room",

    NEW_MESSAGE: 'new message',

    OLD_MESSAGES: 'load old messages',

    USER_STARTS_TYPING: 'user starts typing',
    USER_STOP_TYPING: 'user stop typing',
};



export const userConnected = (user) => socket.emit(SOCKET_EVENTS.USER_CONNECTED, user);
socket.on(SOCKET_EVENTS.SHOW_CONVERSATIONS, conservations => STORE.dispatch({
    type: CHAT_ACTIONS.SHOW_CONVERSATIONS,
    conservations
}));

export const sendMessage = (content) => socket.emit(SOCKET_EVENTS.NEW_MESSAGE, content);
socket.on(SOCKET_EVENTS.NEW_MESSAGE, message => STORE.dispatch({
    type: CHAT_ACTIONS.NEW_MESSAGE,
    message
}));

export const joinToRoom = (roomId) => socket.emit(SOCKET_EVENTS.JOIN_TO_ROOM, roomId);
socket.on(SOCKET_EVENTS.JOIN_TO_ROOM, conversation => STORE.dispatch({
    type: CHAT_ACTIONS.OPEN_CONVERSATION,
    conversation
}));

socket.on(SOCKET_EVENTS.OLD_MESSAGES, messages => STORE.dispatch({
    type: CHAT_ACTIONS.ADD_MESSAGES,
    messages
}));
export const leaveTheRoom = () => socket.emit(SOCKET_EVENTS.LEAVE_THE_ROOM);


export const startConversation = (id) => socket.emit(SOCKET_EVENTS.START_CONVERSATION, id);

export const findUsers = (displayName) => socket.emit(SOCKET_EVENTS.FIND_USERS, displayName);
socket.on(SOCKET_EVENTS.FOUND_USERS, users => STORE.dispatch({
    type: CHAT_ACTIONS.FOUND_USERS,
    users
}));

export const userStartsTyping = () => socket.emit(SOCKET_EVENTS.USER_STARTS_TYPING);
socket.on(SOCKET_EVENTS.USER_STARTS_TYPING, () => STORE.dispatch({
    type: CHAT_ACTIONS.PARTICIPANT_IS_TYPING,
}));

export const userStopTyping = () => socket.emit(SOCKET_EVENTS.USER_STOP_TYPING);
socket.on(SOCKET_EVENTS.USER_STOP_TYPING, () => STORE.dispatch({
    type: CHAT_ACTIONS.PARTICIPANT_STOP_TYPING,
}));

import io from 'socket.io-client';

import { SOCKET_EVENTS } from "../../constants";
import { baseURL } from "../baseURL";

export const socket = io(baseURL, {
    autoConnect: false
});


/*
socket.on(SOCKET_EVENTS.JOIN_ME_TO_ROOMS, data => store.dispatch({
    type: CHAT_ACTION_TYPES.GET_USER_CHATS_RESPONSE,
    data
}));

export const sendMessage = (room, data) => socket.emit(SOCKET_EVENTS.CHAT_MESSAGE,room, data);
*/


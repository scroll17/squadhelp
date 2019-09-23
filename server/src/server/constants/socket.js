const SOCKET_EVENTS = {
    ON: {
        CONNECTION: 'connection',
        DISCONNECT: 'disconnect',

        USER_CONNECTED: 'user connected',
        OPEN_CHAT: 'open chat',

        NEW_MESSAGE: 'new message',

        START_CONVERSATION: "start conversation",

        JOIN_TO_ROOM: 'join to room',
        LEAVE_THE_ROOM: "leave the room",

        USER_STARTS_TYPING: 'user starts typing',
        USER_STOP_TYPING: 'user stop typing',

        FIND_USERS: 'find users',
    },
    EMIT: {
        SHOW_CONVERSATION: 'show conversations',
        NEW_CONVERSATION_SAVE: "save new conversation",

        USER_STARTS_TYPING: 'user starts typing',
        USER_STOP_TYPING: 'user stop typing',

        JOIN_TO_ROOM: 'join to room',

        OLD_MESSAGES: 'load old messages',
        NEW_MESSAGE: 'new message',

        FOUND_USERS: 'found users',
    }

};
const USER_SOCKET_DATA = new Map();

module.exports = {
    SOCKET_EVENTS,
    USER_SOCKET_DATA
};
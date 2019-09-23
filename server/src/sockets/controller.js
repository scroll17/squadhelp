const findUsersEvent = require('./eventHandllers/findUsersEvent');
const userOpenChatEvent = require('./eventHandllers/userOpenChatEvent');
const userConnectedEvent = require('./eventHandllers/userConnectedEvent');
const startConversationEvent = require('./eventHandllers/startConversationEvent');

const newMessageEvent = require('./eventHandllers/newMessageEvent');
const joinToRoomEvent = require('./eventHandllers/joinToRoomEvent');
const leaveTheRoomEvent = require('./eventHandllers/leaveTheRoomEvent');

const userStartsTyping = require('./eventHandllers/userTyping/userStartsTyping');
const userStopTyping = require('./eventHandllers/userTyping/userStopTyping');

const { SOCKET_EVENTS: { ON }, USER_SOCKET_DATA } = require('../server/constants');

module.exports = async io => {


    try{
        io.on(ON.CONNECTION,  (socket) => {

            userConnectedEvent(socket);

            userOpenChatEvent(socket);

            findUsersEvent(socket);

            startConversationEvent(socket);

            newMessageEvent(socket);

            joinToRoomEvent(io, socket);
            leaveTheRoomEvent(socket);

            userStartsTyping(socket);
            userStopTyping(socket);


            socket.on(ON.DISCONNECT, reason => {
                USER_SOCKET_DATA.delete(socket.id);
                console.info('user disconnect:', reason)
            })

        });
    }catch (e) {
        console.log(e)
    }
};



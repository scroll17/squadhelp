const findUsersEvent = require('./eventHandllers/findUsersEvent');
const userConnectedEvent = require('./eventHandllers/userConnectedEvent');
const startConversationEvent = require('./eventHandllers/startConversationEvent');

const newMessageEvent = require('./eventHandllers/newMessageEvent');
const joinToRoomEvent = require('./eventHandllers/joinToRoomEvent');
const leaveTheRoomEvent = require('./eventHandllers/leaveTheRoomEvent');


const { SOCKET_EVENTS: { ON, EMIT }, USER_SOCKET_DATA: userData, CONNECTED_CLIENTS } = require('../server/utils/consts');

module.exports = async io => {


    try{
        io.on(ON.CONNECTION,  (socket) => {

            userConnectedEvent(io, socket);

            findUsersEvent(socket);

            startConversationEvent(socket);

            newMessageEvent(socket);

            joinToRoomEvent(io, socket);

            leaveTheRoomEvent(socket);


            socket.on(ON.USER_STARTS_TYPING, (id) => {
                socket.to(userData.get('roomId')).emit(EMIT.USER_STARTS_TYPING, id)
            });

            socket.on(ON.USER_STOP_TYPING, () => {
                socket.to(userData.get('roomId')).emit(EMIT.USER_STOP_TYPING)
            });

            socket.on(ON.DISCONNECT, reason => {
                console.info('user disconnect:', reason)
            })
        });
    }catch (e) {
        console.log(e)
    }
};





const db = require('../server/models');


const { SOCKET_EVENTS: { ON, EMIT } } = require('../server/utils/consts');



const findUsersEvent = require('./eventHandllers/findUsersEvent');
const userConnectedEvent = require('./eventHandllers/userConnectedEvent');
const startConversationEvent = require('./eventHandllers/startConversationEvent');

const newMessageEvent = require('./eventHandllers/newMessageEvent');
const joinToRoomEvent = require('./eventHandllers/joinToRoomEvent');

module.exports = io => {

    const userData = new Map();


    io.on(ON.CONNECTION,  (socket) => {


        userConnectedEvent(socket, userData);

        findUsersEvent(socket, userData);
        startConversationEvent(socket, userData);

        newMessageEvent(io, socket, userData);

        joinToRoomEvent(socket, userData);

        socket.on(ON.LEAVE_THE_ROOM, () => {

            if(userData.has('newConversation')){
                console.log(' --- DELETE newConversation ---', userData.get('newConversation'));
                userData.delete('newConversation');
            }

            socket.leave(userData.get('roomId'), () => {
                console.log('user leave room', socket.rooms)
            });
            userData.delete('roomId')
        });


        socket.on(ON.USER_STARTS_TYPING, () => {
            console.log(' --------- USER TYPING ---------');
            socket.to(userData.get('roomId')).emit(EMIT.USER_STARTS_TYPING)
        });

        socket.on(ON.USER_STOP_TYPING, () => {
            console.log(' --------- USER STOP TYPING ---------');
            socket.to(userData.get('roomId')).emit(EMIT.USER_STOP_TYPING)
        });



        socket.on(ON.DISCONNECT, reason => {
            console.info('user disconnect:', reason)
        })
    });
};



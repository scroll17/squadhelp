const { Message, Conversation } = require('../server/mongoModels/index');
const { User } = require('../server/models/index');

const db = require('../server/models');

const mongoose = require("mongoose");


const { SOCKET_EVENTS: { ON, EMIT } } = require('../server/utils/consts');



const findUsersEvent = require('./eventHandllers/findUsersEvent');
const userConnectedEvent = require('./eventHandllers/userConnectedEvent');
const startConversationEvent = require('./eventHandllers/startConversationEvent');



module.exports = io => {

    const userData = new Map();


    io.on(ON.CONNECTION,  (socket) => {


        userConnectedEvent(socket, userData);

        findUsersEvent(socket, userData);

        startConversationEvent(socket, userData);


        socket.on(ON.JOIN_TO_ROOM, async (roomId) => {
            userData.set('roomId', roomId);

            const foundMessages = await Message.aggregate([
                {$match: {
                        conversationId: mongoose.Types.ObjectId(roomId)
                    }},
                {$project: {
                        _id: 0,
                        conversationId: 0,
                    }},
            ]);


            socket.join(roomId, () => {
                console.log('user join room', socket.rooms)
            });

            socket.emit(EMIT.OLD_MESSAGE, foundMessages)
        });

        socket.on(ON.LEAVE_THE_ROOM, () => {
            socket.leave(userData.get('roomId'), () => {
                console.log('user leave room', socket.rooms)
            });
            userData.delete('roomId')
        });

        socket.on(ON.NEW_MESSAGE, async ({ownerId, content, time}) => {
            const conversationId = userData.get('roomId');

            const message = await Message.create({
                time,
                content,
                ownerId,
                conversationId: conversationId
            });

            const messagePushToConversation = await Conversation.updateOne({ _id: conversationId }, {
                $push: { messages: message }
            }, {
                timestamps: false
            });
            if(messagePushToConversation.ok >= 1){
                socket.to(conversationId).emit(EMIT.NEW_MESSAGE, message);
            }else{
                console.log('error ---- message not send')
            }
        });




        socket.on(ON.DISCONNECT, reason => {
            console.info('user disconnect:', reason)
        })
    });
};



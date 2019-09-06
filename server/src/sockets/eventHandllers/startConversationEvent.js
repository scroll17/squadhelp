const db = require('../../server/models');
const { Conversation } = require('../../server/mongoModels/index');

const { SOCKET_EVENTS: { ON, EMIT } } = require('../../server/utils/consts');

const { isEmpty, first } = require('lodash');
const joinToRoom = require('./joinToRoom');

module.exports = (socket, userData) => socket.on(ON.START_CONVERSATION, async participantId => {

    const foundConversation = await Conversation.aggregate([
        {$match: {
                $expr: {
                    $in: [ participantId, "$participants" ]
                }
            }},
        {$project: {
                createdAt: 0,
                updatedAt: 0,
            }},
    ]);

    if(isEmpty(foundConversation)){
        const conversation = await Conversation.create({
            participants: [participantId, userData.get('id')]
        });
        userData.set('roomId', conversation._id);
    }else {
        userData.set('roomId', first(foundConversation)._id);
    }

    const newRoom = userData.get('roomId');

    joinToRoom(socket, newRoom);
    socket.emit(EMIT.JOIN_TO_ROOM, newRoom)
});
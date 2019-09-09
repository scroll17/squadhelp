const { Conversation } = require('../../server/mongoModels/index');

const { SOCKET_EVENTS: { ON, EMIT }, USER_SOCKET_DATA: userData  } = require('../../server/utils/consts');

const { isEmpty, first } = require('lodash');

const findMessage = require('../middlewares/findMessage');

module.exports = (socket) => socket.on(ON.START_CONVERSATION, async data => {

    const {id: participantId, displayName: title} = data;

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
        const conversation = new Conversation({
            participants: [participantId, userData.get('id')]
        });

        userData.set('newConversation', conversation);
        userData.set('roomId', conversation._id);

    }else {

        const roomId = first(foundConversation)._id;
        userData.set('roomId', roomId);

        const foundMessages = await findMessage(roomId);
        socket.emit(EMIT.OLD_MESSAGES, foundMessages);
    }

    const newRoom = userData.get('roomId');

    socket.join(newRoom);
    socket.emit(EMIT.JOIN_TO_ROOM, { _id: newRoom, title})
});
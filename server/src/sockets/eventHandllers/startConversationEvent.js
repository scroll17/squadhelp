const { Conversation } = require('../../server/mongoModels/index');

const { SOCKET_EVENTS: { ON, EMIT } } = require('../../server/utils/consts');

const { isEmpty, first } = require('lodash');

const joinToRoom = require('../middlewares/joinToRoom');
const findMessage = require('../middlewares/findMessage');

module.exports = (socket, userData) => socket.on(ON.START_CONVERSATION, async data => {

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
        console.log('new conversation', conversation);

        userData.set('newConversation', conversation);
        userData.set('roomId', conversation._id);
    }else {
        console.log('old conversation', foundConversation);

        const roomId = first(foundConversation)._id;

        userData.set('roomId', roomId);

        const foundMessages = await findMessage(roomId);
        socket.emit(EMIT.OLD_MESSAGES, foundMessages);
    }

    const newRoom = userData.get('roomId');

    joinToRoom(socket, newRoom);
    socket.emit(EMIT.JOIN_TO_ROOM, {newRoom, title})
});
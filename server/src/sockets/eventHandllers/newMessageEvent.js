const { Conversation, Message } = require('../../server/mongoModels/index');

const { SOCKET_EVENTS: { ON, EMIT }, USER_SOCKET_DATA  } = require('../../server/constants');

module.exports = (socket) => socket.on(ON.NEW_MESSAGE, async ({ownerId, content, time}) => {

    const userData = USER_SOCKET_DATA.get(socket.id);

    if(userData.has('newConversation')){
        const conversation = userData.get('newConversation');
        await conversation.save();

        userData.delete('newConversation');

        socket.emit(EMIT.NEW_CONVERSATION_SAVE);
    }

    const conversationId = userData.get('roomId');

    const message = await Message.create({
        time,
        content,
        ownerId,
        conversationId,
    });

    const messagePushToConversation = await Conversation.updateOne({ _id: conversationId }, {
        $push: { messages: message }
    }, {
        timestamps: false
    });

    socket.to(conversationId).emit(EMIT.NEW_MESSAGE, message);
});
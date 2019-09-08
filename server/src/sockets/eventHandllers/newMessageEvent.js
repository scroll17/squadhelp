const { Conversation, Message } = require('../../server/mongoModels/index');

const { SOCKET_EVENTS: { ON, EMIT } } = require('../../server/utils/consts');

module.exports = (io, socket, userData) => socket.on(ON.NEW_MESSAGE, async ({ownerId, content, time}) => {

    if(userData.has('newConversation')){
        const conversation = userData.get('newConversation');
        const awg = await conversation.save();

        console.log(' ----------- AWG -----------', awg);

        userData.delete('newConversation');
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

    if(messagePushToConversation.ok >= 1){
        io.to(conversationId).emit(EMIT.NEW_MESSAGE, message);
    }else{
        console.log('error ---- message not send')
    }
});
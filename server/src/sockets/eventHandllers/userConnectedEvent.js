const { Message, Conversation } = require('../../server/mongoModels/index');

const { SOCKET_EVENTS: { ON, EMIT } } = require('../../server/utils/consts');

const findParticipant = require('../middlewares/findParticipant');

module.exports = (socket, userData) => socket.on( ON.USER_CONNECTED, async user => {
    userData
        .set('id', user.id)
        .set('role', user.role);


    const foundConversation = await Conversation.aggregate([
        {$match: {
                $expr: {
                    $in: [ user.id, "$participants" ],
                }
            }},
        {$project: {
                participant: {
                    $filter: {
                        input: "$participants",
                        as: "participant",
                        cond: { $ne: [ "$$participant", user.id ] }
                    }
                },
                lastMessageId: {
                    $slice: [ "$messages", -1 ]
                },
            }},
        {$unwind: "$participant"},
        {$unwind: "$lastMessageId"},
        {$lookup: {
                from: "MessageCollection",
                localField: "lastMessageId",
                foreignField: "_id",
                as: "lastMessage"
            }},
        {$unwind: "$lastMessage"},
        {$project: {
                lastMessageId: 0,
                lastMessage: {
                    _id: 0,
                    conversationId: 0
                }
            }},
    ]);

    for(let i = 0; i < foundConversation.length; i++){
        const user = await findParticipant(foundConversation[i].participant);
        foundConversation[i]['title'] = user.displayName;
    }

    socket.emit( EMIT.SHOW_CONVERSATION, foundConversation);
});

// {$cond: { lastMessageId:  { $exists: true, $not: {$size: 0} } }
//lastMessageId: { $arrayElemAt: [ "$participants", -1 ] },
const { Conversation } = require('../../server/mongoModels/index');
const { SOCKET_EVENTS: { ON }, USER_SOCKET_DATA  } = require('../../server/constants');

module.exports = (socket) => socket.on( ON.USER_CONNECTED, async user => {

    USER_SOCKET_DATA.set(socket.id, new Map([
        ['id', user.id],
        ['role', user.role]
    ]));

    const foundConversation = await Conversation.aggregate([
        {
            $match: {
                $expr: {
                    $in: [user.id, "$participants"],
                }
            }
        },
        {
            $project: {
                _id: 1
            }
        },
    ]);

    foundConversation.forEach( conversation => {
        socket.join(conversation._id);
    });

});

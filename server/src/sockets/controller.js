const { Message, Conversation } = require('../server/mongoModels/index');
const { User } = require('../server/models/index');

const db = require('../server/models');

const { SOCKET_EVENTS: { ON, EMIT }, ROLE} = require('../server/utils/consts');

module.exports = io => {
    const userData = new Map();


    io.on(ON.CONNECTION,  (socket) => {

        socket.on(ON.USER_CONNECTED, async user => {
            userData.set('id', user.id);

            const foundConversation = await Conversation.aggregate([
                {$match: {
                    $expr: {
                        $in: [ 12, "$participants" ]
                    }
                }},
                {$project: {
                        participants: 1,
                        lastMessageId: {
                            $slice: [ "$messages", -1 ]
                        },
                        //recent: { $arrayElemAt: [ "$participants", -1 ] },
                    }},
                {$unwind: "$lastMessageId"},
                {$lookup: {
                        from: "MessageCollection",
                        localField: "lastMessageId",
                        foreignField: "_id",
                        as: "lastMessage"
                    }},
                {$unwind: "$lastMessage"},
                {$project: {
                        lastMessage: {
                            _id: 0,
                            conversationId: 0
                        }
                    }},
            ]);

            console.log('foundConversation', foundConversation);


            for(let i = 0; i < foundConversation.length; i++){
                let currentConversation = foundConversation[i];

                let participants = currentConversation.participants;
                let userIndexInParticipants = participants.indexOf(userData.get('id'));

                participants.splice(userIndexInParticipants, 1);

                const user = await User.findByPk(participants[0], {
                    attributes: {
                        exclude: ['firstName','lastName','password','role','isBanned','createdAt','updatedAt']
                    },
                    raw: true
                });

                currentConversation['title'] = user.displayName
            }

            socket.emit(EMIT.SHOW_CONVERSATION, foundConversation);
        });


        socket.on(ON.START_A_CONVERSATION, async participantId => {

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


            if(foundConversation.length === 0){
                const conversation = await Conversation.create({
                    participants: [participantId, userData.get('id')]
                });
                userData.set('roomId', conversation._id);

                console.log('new room');
            }else {
                console.log('join room');

                userData.set('roomId', foundConversation[0]._id);
            }


            const newRoom = userData.get('roomId');
            socket.join(newRoom, () => {
                console.log('user join room', socket.rooms)
            });

            socket.emit(EMIT.JOIN_TO_ROOM, newRoom)
        });


        socket.on(ON.JOIN_TO_ROOM, (roomId) => {
            userData.set('roomId', roomId);
            socket.join(roomId, () => {
                console.log('user join room', socket.rooms)
            });
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

        socket.on(ON.FIND_USERS, async ({data}) => {
            const users = await User.findAll({
                where: {
                    displayName: {
                        $iLike: `%${data}%`
                    },
                    id: {
                        $not: userData.get('id')
                    },
                    role:{
                        $not: ROLE.ADMIN
                    }
                },
                limit: 10,
                raw: true,
                attributes: {
                    include: ['role','displayName', 'id']
                },
                order: [['displayName', 'ASC']]
            });
            socket.emit(EMIT.FOUND_USERS, users)
        });



        socket.on(ON.DISCONNECT, reason => {
            console.info('user disconnect:', reason)
        })
    });
};



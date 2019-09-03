const { Message, Conversation } = require('../server/mongoModels/index');
const { User } = require('../server/models/index');

const db = require('../server/models');

module.exports = io => {


    io.on('connection', function (socket) {
        socket.emit('connected', { text: 'Your connected !' });


        socket.on('msg', async content => {
            const message = new Message({
                content: content.text,
                ownerId: content.id,
                conversationId: '5d505646cf6d4fe581014ab2'
            });

            await message.save();
            io.to('all').emit('new message', content)
        });

        socket.on('find users', async value => {
            console.log(value);
            const users = await User.findAll({
                where: {
                    displayName: {
                        $iLike: `%${value.data}%`
                    }
                },
                raw: true,
                attributes: {
                    include: ['firstName','lastName', 'displayName', 'id', 'email']
                },
                order: [['displayName', 'ASC']]
            });

            console.log('users', users);
            socket.emit('finded user', users)
        });

        socket.on('disconnect', reason => {
            console.info('user disconnect:', reason)
        })
    });
};



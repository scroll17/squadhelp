const { Message, Conversation } = require('../server/mongoModels/index');
const { User } = require('../server/models/index');

const db = require('../server/models');
const {
    sequelize: {
        Op
    }
} = db;

module.exports = io => {

    io.on('connection', function (socket) {
        socket.emit('connected', { text: 'Your connected !' });
        console.log('user connection');

        socket.join('all');
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
                        [Op.iLike]: `%${value.data}%`
                    }
                },
                raw: true,
                attributes: {
                    exclude: ['password','updatedAt', 'createdAt']
                },
                order: [['firstName', 'ASC']]
            });

            socket.emit('finded user', users)
        });

        socket.on('disconnect', reason => {
            console.info('user disconnect:', reason)
        })
    });
};


/*
    https://engineering.universe.com/mongo-aggregations-in-5-minutes-b8e1d9c274bb
    https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-lookup
    https://mongoosejs.com/docs/api.html#aggregate_Aggregate-cursor
    https://mongoosejs.com/docs/api.html#query_Query-cursor
    https://mongoosejs.com/docs/populate.html#query-conditions
    https://docs.mongodb.com/manual/reference/operator/aggregation/match/index.html
    https://mongoosejs.com/docs/api/model.html#model_Model.aggregate
    https://mongoosejs.com/docs/api.html#model_Model.create
    https://mongoosejs.com/docs/search.html?q=create
    https://docs.mongodb.com/manual/reference/operator/#AdvancedQueries-%7B%7Bskip%28%29%7D%7D?searchProperty=current&query=skip
*/

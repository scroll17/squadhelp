const { User } = require('../../server/models/index');

const { SOCKET_EVENTS: { ON, EMIT }, ROLE, ROLES, USER_SOCKET_DATA } = require('../../server/constants');

const isEqual = require('lodash/isEqual');


module.exports = (socket) => socket.on(ON.FIND_USERS, async ({data}) => {

    const userData = USER_SOCKET_DATA.get(socket.id);

    const findForAdmin = isEqual(userData.get('role'), ROLE.ADMIN);

    const users = await User.findAll({
        where: {
            displayName: {
                $iLike: `%${data}%`
            },
            id: {
                $not: userData.get('id')
            },
            role: findForAdmin ? [...ROLES] : { $not: ROLE.ADMIN }
        },

        raw: true,

        attributes: {
            include: ['role','displayName', 'id']
        },
        order: [['displayName', 'ASC']]
    });

    socket.emit(EMIT.FOUND_USERS, users)
});

const db = require('../../server/models');
const { User } = require('../../server/models/index');

const { SOCKET_EVENTS: { ON, EMIT }, ROLE, ROLES } = require('../../server/utils/consts');

const isEqual = require('lodash/isEqual');

module.exports = (socket, userData) => socket.on(ON.FIND_USERS, async ({data}) => {

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

        limit: 10,
        raw: true,

        attributes: {
            include: ['role','displayName', 'id']
        },
        order: [['displayName', 'ASC']]
    });

    socket.emit(EMIT.FOUND_USERS, users)
});

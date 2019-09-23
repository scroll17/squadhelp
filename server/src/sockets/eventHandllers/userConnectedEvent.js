const { SOCKET_EVENTS: { ON }, USER_SOCKET_DATA  } = require('../../server/constants');

module.exports = (socket) => socket.on( ON.USER_CONNECTED, user => {

    USER_SOCKET_DATA.set(socket.id, new Map([
        ['id', user.id],
        ['role', user.role]
    ]));

});

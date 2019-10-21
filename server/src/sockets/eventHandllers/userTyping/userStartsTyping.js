const { SOCKET_EVENTS: { ON, EMIT }, USER_SOCKET_DATA } = require('../../../server/constants');

module.exports = (socket) => socket.on(ON.USER_STARTS_TYPING, (id) => {
    const userData = USER_SOCKET_DATA.get(socket.id);

    socket.to(userData.get('roomId')).emit(EMIT.USER_STARTS_TYPING, id)
});

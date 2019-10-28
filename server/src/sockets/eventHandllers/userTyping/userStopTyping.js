const { SOCKET_EVENTS: { ON, EMIT }, USER_SOCKET_DATA } = require('../../../server/constants');

module.exports = (socket) => socket.on(ON.USER_STOP_TYPING, () => {
    const userData = USER_SOCKET_DATA.get(socket.id);

    socket.to(userData.get('roomId')).emit(EMIT.USER_STOP_TYPING)
});

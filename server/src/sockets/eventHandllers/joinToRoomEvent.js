const { SOCKET_EVENTS: { ON, EMIT }, USER_SOCKET_DATA: userData } = require('../../server/constants');

const foundMessage = require('../middlewares/findMessage');

module.exports = (io, socket) => socket.on(ON.JOIN_TO_ROOM, async (roomId) => {
    userData.set('roomId', roomId);

    const foundMessages = await foundMessage(roomId);
    socket.emit(EMIT.OLD_MESSAGES, foundMessages);
});

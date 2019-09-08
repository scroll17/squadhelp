const { SOCKET_EVENTS: { ON, EMIT } } = require('../../server/utils/consts');

const joinToRoom = require('../middlewares/joinToRoom');
const foundMessage = require('../middlewares/findMessage');

module.exports = (socket, userData) => socket.on(ON.JOIN_TO_ROOM, async (roomId) => {
    userData.set('roomId', roomId);

    const foundMessages = await foundMessage(roomId);
    socket.emit(EMIT.OLD_MESSAGES, foundMessages);

    joinToRoom(socket, roomId);
});

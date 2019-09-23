const {SOCKET_EVENTS: {ON}, USER_SOCKET_DATA} = require('../../server/constants');

module.exports = (socket) => socket.on(ON.LEAVE_THE_ROOM, () => {
    const userData = USER_SOCKET_DATA.get(socket.id);

    if (userData.has('newConversation')) {
        userData.delete('newConversation');
    }
    userData.delete('roomId')

});
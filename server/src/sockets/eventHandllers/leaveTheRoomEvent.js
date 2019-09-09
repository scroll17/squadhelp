const { SOCKET_EVENTS: { ON }, USER_SOCKET_DATA: userData  } = require('../../server/utils/consts');

module.exports = (socket) => socket.on(ON.LEAVE_THE_ROOM, () => {
    if(userData.has('newConversation')){
        userData.delete('newConversation');
    }

    userData.delete('roomId')
});
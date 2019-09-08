module.exports = (socket, room) => {
    socket.join(room, () => {
        const coll = Object.keys(socket.rooms);

        if(coll.length > 2){
            console.error(' ---- SOCKET ROOM ERROR ----')
        }

        console.log('user join room', socket.rooms)
    });
};
module.exports = (socket, room) => {
    socket.join(room, () => {
        const coll = Object.keys(socket.rooms);

        if(coll > 2){
            console.error(' ---- SOCKET ERROR ----')
        }

        console.log('user join room', socket.rooms)
    });
};
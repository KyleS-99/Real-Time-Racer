const Client = require('./models/Client');
const Passage = require('./models/Passage');

// Generate random room id
const guid = require('./helpers/guid');

const leaveAllRooms = socket => {
    for(room in socket.rooms){
        // If user is in a room already make them leave;
        // before getting into a new race
        if(socket.id !== room) {
            socket.leave(room);
        }
    }
};

// All connected users
let allConnectedClients = new Map();

const configuredSocketIO = socket => {
    socket.on('searching', data => {
        leaveAllRooms(socket);

        if (!allConnectedClients.has(socket.id)) {
            allConnectedClients.set(socket.id, new Client(socket, data));
        }

        setTimeout(() => {
            allConnectedClients.forEach((client) => {
                const { id, state, clientSocket, setState, name, img } = client;
    
                // If user is searching & they're not us
                if (state === 'searching' && socket.id !== id) {
                    const unique_key = guid();
    
                    // Users join room
                    clientSocket.join(unique_key);
                    socket.join(unique_key);
    
                    const us = allConnectedClients.get(socket.id);
                    
                    setState('in-game');
                    us.setState('in-game');
    
                    Passage.random()
                        .then((doc) => {
                            if (doc) {
                                const { passage, _id: passageId } = doc;
    
                                // Emit opponent-found
                                socket.emit('opponent-found', {
                                    name,
                                    img,
                                    passage,
                                    passageId,
                                    unique_key,
                                    opponentId: id
                                });
                                clientSocket.emit('opponent-found', {
                                    name: us.name,
                                    img: us.img,
                                    passage,
                                    passageId,
                                    unique_key,
                                    opponentId: us.id
                                });
                            }
                        })
                        .catch(() => {
                            socket.emit('failed');
                            clientSocket.emit('failed');
                        });
                }
            });
        }, 0);
    });

    socket.on('private-race', ({ room, name, img }) => {
        if (allConnectedClients.has(socket.id)) {
            leaveAllRooms(socket);
            const us = allConnectedClients.get(socket.id);
            us.setState('private-race');
            socket.join(room);
        } else {
            allConnectedClients.set(socket.id, new Client(socket, { name, img }, 'private-race'));
            allConnectedClients.get(socket.id).clientSocket.join(room);
        }

        setTimeout(() => {
            allConnectedClients.forEach((client) => {
                const { clientSocket, name, img, id, state } = client;

                if (clientSocket.rooms[room] !== undefined && state === 'private-race' && id !== socket.id && allConnectedClients.get(socket.id).state === 'private-race') {
                    const us = allConnectedClients.get(socket.id);
                    Passage.random()
                        .then((doc) => {
                            if (doc) {
                                const { passage, _id: passageId } = doc;
    
                                // Emit opponent-found
                                socket.emit('opponent-joined', {
                                    name,
                                    img,
                                    passage,
                                    passageId,
                                    unique_key: room,
                                    opponentId: id
                                });
                                clientSocket.emit('opponent-joined', {
                                    name: us.name,
                                    img: us.img,
                                    passage,
                                    passageId,
                                    unique_key: room,
                                    opponentId: socket.id
                                });
                            }
                        })
                        .catch(() => {
                            socket.emit('failed');
                            clientSocket.emit('failed');
                        });
                }
            });
        }, 0);
    });

    socket.on('ready', (opponentId) => {
        const us = allConnectedClients.get(socket.id);
        const opponent = allConnectedClients.get(opponentId);

        if (us) {
            us.setState('ready');
            
            if (opponent && opponent.state === 'ready') {
                socket.emit('start');
                opponent.clientSocket.emit('start');
            }
        }
    });

    socket.on('update', ({ room, wpm, percent }) => {
        socket.to(room).emit('updated-stats', { wpm, percent });
    });

    socket.on('disconnect', () => {
        allConnectedClients.delete(socket.id);
    });
};

module.exports = configuredSocketIO;
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
let allConnectedClients = [];

const configuredSocketIO = socket => {
    socket.on('searching', data => {
        leaveAllRooms(socket);

        const inArray = allConnectedClients.filter(client => client.id === socket.id);

        if (inArray.length !== 0) {
            inArray[0].setState('searching');
        } else {
            var connectedClient = new Client(socket, data);

            allConnectedClients.push(connectedClient);
        }

        for (let i = 0; i < allConnectedClients.length; i++) {
            const { id, state, clientSocket, setState, name, img } = allConnectedClients[i];
            
            // if user is searching for a game, match them; but only if it's not us
            if (state === 'searching' && socket.id !== id) {
                // Generate unique key
                const unique = guid();
                
                // Make users join that unique room
                clientSocket.join(unique);
                socket.join(unique);

                setState('in-game');
                
                if (inArray.length !== 0) {
                    inArray[0].setState('in-game');
                } else {
                    connectedClient.setState('in-game');
                }

                Passage.random()
                    .then(doc => {
                        if (doc) {
                            const { passage, _id: passageId } = doc;

                            // Emit opponent-found
                            socket.emit('opponent-found', { name, img, passage, passageId });
                            clientSocket.emit('opponent-found', inArray.length !== 0 ? { 
                                name: inArray[0].name,
                                img: inArray[0].img,
                                passage,
                                passageId
                            } : 
                            { 
                                name: connectedClient.name,
                                img: connectedClient.img,
                                passage,
                                passageId
                            });
                        }
                    })
                    .catch(e => {
                        socket.emit('failed');
                        clientSocket.emit('failed');
                    });

                break;
            }
        }
    });

    socket.on('disconnect', () => {
        allConnectedClients = allConnectedClients.filter(client => client.id !== socket.id);
    });
};

module.exports = configuredSocketIO;
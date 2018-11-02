// Client constructor
const Client = require('./models/Client');

// Generate random room id
const guid = require('./helpers/guid');

// Leave all rooms
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
        // Leave all rooms
        leaveAllRooms(socket);
        
        // Check to see if already in array
        const inArray = allConnectedClients.filter(client => client.id === socket.id);

        // They're in the array set them back to searching
        if (inArray.length !== 0) {
            inArray[0].setState('searching');
        } else {
            // Generate new Client
            var connectedClient = new Client(socket, data);

            // Added to all connected users
            allConnectedClients.push(connectedClient);
        }

        for (let i = 0; i < allConnectedClients.length; i++) {
            const { id, state, clientSocket, setState, name, img } = allConnectedClients[i];
            
            // if user is searching for game match them
            // but only if it's not us
            if (state === 'searching' && socket.id !== id) {
                // Generate unique key
                const unique = guid();
                
                // Make users join that unique room
                clientSocket.join(unique);
                socket.join(unique);

                // Set that users state to in-game
                setState('in-game');
                
                // If we exist in the array
                // set state from there
                if (inArray.length !== 0) {
                    inArray[0].setState('in-game');
                } else {
                    // else use the newly created one to set state to in-game
                    connectedClient.setState('in-game');
                }

                // Emit opponent-found
                socket.emit('opponent-found', { name, img });
                clientSocket.emit('opponent-found', inArray.length !== 0 ? { name: inArray[0].name, img: inArray[0].img } : { name: connectedClient.name, img: connectedClient.img });

                // break out of the loop because we don't need to loop through anymore - we found an opponent
                break;
            }
        }
    });

    socket.on('disconnect', () => {
        allConnectedClients = allConnectedClients.filter(client => client.id !== socket.id);
    });
};

module.exports = configuredSocketIO;
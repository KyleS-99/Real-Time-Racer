// Imports
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

// Client constructor
const Client = require('./models/Client');

// Generate random room id
const guid = require('./helpers/guid');

// initialize socket.io/server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// db cred
const { mongoURI } = require('./config/keys');

// Router
const users = require('./routes/users');
const passages = require('./routes/passages');
const tests = require('./routes/tests');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to database
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected!'))
    .catch(e => console.log(e));

// Routes
app.use('/users', users);
app.use('/passages', passages);
app.use('/tests', tests);

// Start the server
const port = process.env.PORT || 5000;

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

// Users searching for a game
let allConnectedClients = [];

// Socket.io code
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('searching', (data) => {
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

            // Added to all connected clients
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

                // break out of the loop because we don't need to loop through anymore we found an opponent
                break;
            }
        }
    });

    socket.on('disconnect', () => {
        allConnectedClients = allConnectedClients.filter(client => client.id !== socket.id);
    });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // if asset not found in static one, load wild-card route (serve index.html)
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

server.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});
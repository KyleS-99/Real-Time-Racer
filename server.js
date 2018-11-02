// Imports
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

// Configured configuredSocketIO
const configuredSocketIO = require('./socket.io');

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

// Socket.io code
io.on('connection', configuredSocketIO);

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
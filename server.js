const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// db cred
const { mongoURI } = require('./config/keys');

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
app.use('/passages/', passages);
app.use('/tests', tests);

// Start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});
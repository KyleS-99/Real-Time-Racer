const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const authRoutes = require('./routes/api/auth');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
});
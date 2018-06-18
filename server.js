'use strict';

// Application  Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Application Setup

const app = express();
const PORT = process.env.PORT;

// Database Setup

// Application Middleware
app.use(cors());

// API Endpoints
app.get('/api/v1/test', (req, res) => {
    console.log('One small step for man. One giant step for computer-kind (visited by a client)')
    res.send('WOWZERS! Made contact to the server!');
});

app.get('*', (req, res) => res.status(404).send('rip'));

app.listen(PORT, () => console.log('The server is alive ITS ALIVE. It is listening on port ' + PORT));
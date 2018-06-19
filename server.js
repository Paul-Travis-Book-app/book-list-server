'use strict';

// Application  Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Application Setup

const app = express();
const PORT = process.env.PORT;

// Database Setup

// // DONE: Don't forget to set your own conString
// // conString for Travis' machine 
// // const conString = 'postgres://postgres:1234@localhost:5432/books_app'; 
// // constString for Paul's machine: 
// // const conString = 'postgres://localhost:5432/books_app';

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// I had to change the below from the above AND add this to the server terminal: 
// FOR PAUL:
// export DATABASE_URL=postgres://localhost:5432/books_app
// FOR TRAVIS:
// export DATABASE_URL=postgres://postgres:1234@localhost:5432/books_app
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.log(err));

// Application Middleware
app.use(cors());

// API Endpoints
app.get('/api/v1/books', (req, res) => {
    console.log('One small step for man. One giant step for computer-kind (handling a GET request by a client)')
    let SQL = `SELECT * FROM books;`;
    client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.status(404).send('rip'));

app.listen(PORT, () => console.log('The server is alive ITS ALIVE. It is listening on port ' + PORT));
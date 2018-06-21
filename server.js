'use strict';

// Application  Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Application Setup

const app = express();
const PORT = process.env.PORT;

// Database Setup

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// I had to change the below from the above AND add this to the server terminal: 
// FOR PAUL:
// export DATABASE_URL=postgres://localhost:5432/books_app
// FOR TRAVIS:
// export DATABASE_URL=postgres://postgres:1234@localhost:5432/books_app

// this is for cloud
const client = new pg.Client(process.env.DATABASE_URL);


client.connect();
client.on('error', err => console.log(err));

// Application Middleware
app.use(cors());

// API Endpoints
app.get('/api/v1/books', (req, res) => {
    console.log('One small step for man. One giant step for computer-kind (handling a GET request by a client')
    let SQL = `SELECT * FROM books;`;
    client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('/api/v1/books-limited', (req, res) => {
    console.log('limited request')
    let SQL = `
        SELECT book_id, title, author, image_url FROM books;
        `;
    client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.post('/api/v1/books', (req, res) => {
    let SQL = `INSERT INTO books_app(book_id, title, author, isbn, image_url, description)
    VALUES ($1, $2, $3, $4, $5, $6);`;


    let values = [
        req.params.id,
        req.body.title,
        req.body.author,
        req.body.isbn,
        req.body.image_url,
        req.body.description
    ];

    client.query(SQL, values)
        .then(function () {
        res.send('insert completed')
        })
        .catch(function (err) {
            console.error(err);
    })
})


app.get('/api/v1/books:id', (req, res) => {
    console.log(req);
    let SQL = `
        SELECT * FROM books WHERE book_id=$1;
        `;
    
        // let values = [request.body.book_id];
    // let values = [body.book_id];

    client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.status(404).send('rip'));

app.listen(PORT, () => console.log('The server is alive ITS ALIVE. It is listening on port ' + PORT));
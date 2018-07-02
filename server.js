'use strict';

// Application  Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Application Setup

const app = express();
const PORT = process.env.PORT;

// Database Setup
const client = new pg.Client(`postgres://kedojwrbxzhisz:74624102c9b3e1b1dca3f12192be0d5797a717593950eac58583af5236121e2a@ec2-23-23-226-190.compute-1.amazonaws.com:5432/d3liq9nrbokkbd`);


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
    let SQL = `INSERT INTO books(title, author, isbn, image_url, description)
    VALUES ($1, $2, $3, $4, $5);`;
    
    console.log(req);
    
    let values = [
        
        req.param.title,
        req.param.author,
        req.param.isbn,
        req.param.image_url,
        req.param.description


    ];
    

    client.query(SQL, values)
        .then(function () {
        res.send('insert completed')
        })
        .catch(function (err) {
            console.error(err);
    })
})

app.put('/api/v1/books/:id', (req, res) => {
    let SQL = `UPDATE books
    SET title=$1,
    SET author=$2,
    SET isbn=$3,
    SET image_url=$4,
    SET description=$5
    WHERE book_id=$1
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
        res.send('edit completed')
        })
        .catch(function (err) {
            console.error(err);
    })
})


app.get('/api/v1/books/:id', (req, res) => {
    // console.log(req);
    let SQL = `
        SELECT * FROM books WHERE book_id= ${req.params.id};
        `;

    client.query(SQL)

    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.delete('/api/v1/books/:id', (req, res) => {
    // console.log(req);
    let SQL = `
        DELETE FROM books WHERE book_id= ${req.params.id};
        `;

    client.query(SQL)

    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.status(404).send('rip'));

app.listen(PORT, () => console.log('The server is alive ITS ALIVE. It is listening on port ' + PORT));
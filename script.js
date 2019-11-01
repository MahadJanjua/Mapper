// Map and data handling Javascript
const express = require('express')
const mysql = require('mysql')
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('main');
});

app.use(express.static(__dirname + '/public'));

app.listen(8080);
console.log('8080 is the magic port');

// Create db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase'
});

// Connect
connection.connect((err) => {
    if(err) { throw err; }
    console.log('Connected');
    connection.query('SELECT firstName FROM customers', (err, result) => {
      if (err) throw err;
      console.log(JSON.stringify(result));
    })
})

// CREATE ARRAYS HERE AND SEE IF YOU CAN USE GLOBAL VARIABLES TO INSTANTIATE
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// // FUNCTIONS USED BY THE HTML
// function newCustomer() {
//     // Information taken from form
//     // connection.query('INSERT INTO Customers NEWINFOHERE')
// }
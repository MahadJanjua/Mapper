// Map and data handling Javascript
const express = require('express')
const mysql = require('mysql')
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// renders the page
app.get('/', function(req, res) {
    res.render('main');
});

//Creating GET Router to fetch all the first names of customers from the MySQL Database
app.get('/first-names' , (req, res) => {
    connection.query('SELECT latitude FROM customers', (err, result) => {
        if (err) throw err;
        else {
            res.send(result)
        }
        console.log(JSON.parse(JSON.stringify(result)))
    })
});

// Gives styling and map
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
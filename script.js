// Map and data handling Javascript
const express = require('express')
const mysql = require('mysql')
var app = express();

var names = []
var lats = []
var longs = []
var dates = []
var counter = 0;

// set the view engine to ejs
app.set('view engine', 'ejs');

// renders the page
app.get('/', function(req, res) {
    res.render('main');
});

//Creating GET Router to fetch all the first names of customers from the MySQL Database
app.get('/latlong' , (req, res) => {
    connection.query('SELECT * FROM customers', (err, result) => {
        counter = 0
        if (err) throw err;
        else {
            res.send(result)
        }
        var latlongs = result
        for (obj in latlongs) {
            names[counter] = latlongs[obj].firstName + " " + latlongs[obj].lastName
            lats[counter] = latlongs[obj].lat
            longs[counter] = latlongs[obj].lng
            dates[counter] = latlongs[obj].endDate
            counter++
        }
        console.log(names)
        console.log(lats)
        console.log(longs)
        console.log(dates)
        return result;
    })
});

app.post('/newcustomer', (req, res) => {
    console.log(req.body)
    // For some reason the body is empty right now. Need to figure out why the info is not appearing in
    // request body
})

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
})
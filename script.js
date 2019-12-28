// Map and data handling Javascript
const express = require('express')
const mysql = require('mysql')
var app = express();
var bodyParser = require('body-parser')

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
            names[counter] = latlongs[obj].name
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/newcustomer', (req, res) => {
    var name = req.body.name
    var phoneNumber = req.body.phoneNumber
    var address = req.body.address

    var endDate = new Date(req.body.date)
    var credits = req.body.credits
    var newMonth = endDate.getMonth() + parseInt(credits, 10) // +1 because january is month 0
    var yearsToAdd = Math.floor(credits/12)
    endDate.setFullYear(endDate.getFullYear() + yearsToAdd)
    endDate.setMonth(newMonth % 12)
    console.log(newMonth)
    console.log(endDate)
    // var query = 'INSERT INTO customers (name, phoneNumber, address, endDate) VALUES (' +
    // name + ', ' +
    // phoneNumber + ', ' +
    // address + ', ' +
    // connection.query()
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
// Map and data handling Javascript
const express = require('express')
const mysql = require('mysql')
var app = express();
var bodyParser = require('body-parser')
var request = require("request");

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

    var endDateSql = endDate.getUTCFullYear() + "-" +
    twoDigits(1 + endDate.getUTCMonth()) + "-" +
    twoDigits(endDate.getUTCDate()) + " " +
    twoDigits(endDate.getUTCHours()) + ":" +
    twoDigits(endDate.getUTCMinutes()) + ":" +
    twoDigits(endDate.getUTCSeconds());

    var API_KEY = "AIzaSyDPihJVQcFUe6oGopjRE33tsw_SiEItCtY";
    var BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    var url = BASE_URL + address + "&key=" + API_KEY;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var lat = JSON.parse(body).results[0].geometry.location.lat;
            var long = JSON.parse(body).results[0].geometry.location.lng;
            var query = 'INSERT INTO customers (name, phoneNumber, address, lat, lng, endDate) VALUES ("' +
            name + '", "' +
            phoneNumber + '", "' +
            address + '", "' +
            lat + '", "' +
            long + '", "' +
            endDateSql + '")'
            connection.query(query)
            res.render('main')

        }
        else {
            console.log('failed')
        }
    })


})

// Gives styling and map
app.use(express.static(__dirname + '/public'));

app.listen(8080);
console.log('8080 is the magic port');

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

// Create db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase'
})
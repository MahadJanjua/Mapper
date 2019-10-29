// Map and data handling Javascript
const express = require('express')
// const mysql = require('mysql')
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

/*
// Create db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase'
});

// Connect
connection.connect((err) => {
    if(err) { console.log('Error'); }
    else { console.log('Connected'); }
})

// local port
app.listen(1337)
*/
// The actual map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.479440, lng: -73.603180},
    zoom: 16
  });
  for (var i = 1; i < 15; i++) { //need to replace distance with number of customers in table
    new google.maps.Marker({
        position: {lat: 45+i, lng: -73},
        map: map,
        title: 'Loop Marker'
      })
  }

  new google.maps.Marker({
  position: {lat:45.479440, lng:-73.603180},
  map: map,
  title: 'Hello World!' });
}

// // FUNCTIONS USED BY THE HTML
// function newCustomer() {
//     // Information taken from form
//     // connection.query('INSERT INTO Customers NEWINFOHERE')
// }

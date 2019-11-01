var map;
var lats = new Array();
var longs = new Array();

lats = [45.5, 46.5, 47.5]
longs = [-73, -73, -73]
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

  for (var i = 0; i < lats.length; i++) {
      new google.maps.Marker({
        position: {lat: lats[i], lng: longs[i]},
        map: map,
        title: 'Array Marker',
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }
      })
  }

  new google.maps.Marker({
  position: {lat:45.479440, lng:-73.603180},
  map: map,
  title: 'Hello World!' });
}
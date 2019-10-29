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
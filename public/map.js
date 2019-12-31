var map;
var today = new Date()

function initMap() {

  fetch('http://localhost:8080/latlong').then(function(response) {
    return response.json();
  }).then(function(data) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.479440, lng: -73.703290},
      zoom: 10
    })
  
    // LOOP FOR DATABASE MARKERS
    for (var i = 0; i < data.length; i++) {
      var dateParts = data[i].endDate.split("-");
      var jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
      // difference is in ms so divide by 1000 for seconds 
      if((jsDate - today)/60000 <= 10080) {
        new google.maps.Marker({
          position: {lat: data[i].lat, lng: data[i].lng},
          map: map,
          title: data[i].name,
          icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }
        })
      }
      else if ((jsDate - today)/60000 <= 43800) {
        new google.maps.Marker({
          position: {lat: data[i].lat, lng: data[i].lng},
          map: map,
          title: data[i].name,
          icon: { url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png" }
        })
      }
      else {
        new google.maps.Marker({
          position: {lat: data[i].lat, lng: data[i].lng},
          map: map,
          title: data[i].name,
          icon: { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }
        })
      }
        
    }
  }).catch(function(error) {
    console.log(error);
  });
}
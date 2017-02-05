// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);

      var restaurants = [
        {
        "id": 1,
        "name": "Foo",
        "location": {
        "latitude": 45.5085997,
        "longitude": -73.6207597
        },
        "meals": [
        {
        "name": "steak",
        "price": 17.5,
        "nutrition": {
        "calories": 1150,
        "carbohydrates_grams": 20,
        "proteins_grams": 12,
        "fats_grams": 4
        }
        },
        {
        "name": "salad",
        "price": 8,
        "nutrition": {
        "calories": 780,
        "carbohydrates_grams": 7,
        "proteins_grams": 0.5,
        "fats_grams": 0.1
        }
        }
        ]
        },
        {
        "id": 2,
        "name": "Bar",
        "location": {
        "latitude": 45.510996,
        "longitude": -73.61647
        },
        "meals": [
        {
        "name": "rice",
        "price": 12,
        "nutrition": {
        "calories": 900,
        "carbohydrates_grams": 25,
        "proteins_grams": 9,
        "fats_grams": 2
        }
        }
        ]
        }
      ];

for (i = 0; i < restaurants.length; i++) {
  var location = restaurants[i].location;
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.latitude, location.longitude),
    map: map
  });
}
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

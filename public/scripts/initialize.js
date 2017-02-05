window.showRestaurantDetails = showRestaurantDetails

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
  const mapElem = document.getElementById('map')

  var map = new google.maps.Map(mapElem, {
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

      restaurants.forEach(restaurant => {
        let location = restaurant.location

        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.latitude, location.longitude),
          map
        })

        // display restaurant details
        marker.addListener('click', e => {
          map.setZoom(15)
          map.setCenter(marker.getPosition())
          window.showRestaurantDetails(restaurant)
        })
      })
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

function showRestaurantDetails(restaurant){
  const detailsElem = $('#details')
  const mealsElem = detailsElem.find('.meals')
  let mealsHtml = ''

  detailsElem.css({
    top: 'calc(50% + 24px)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'block'
  })

  detailsElem.find('.name').text(restaurant.name)

  restaurant.meals.forEach(meal => {
    let mealElem = `<p>${meal.name}</p>`
    mealsHtml += mealElem
  })

  mealsElem.html(mealsHtml)
}
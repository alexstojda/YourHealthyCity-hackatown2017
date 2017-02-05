window.showRestaurantDetails = showRestaurantDetails

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
function initMap() {
  const INITIAL_ZOOM = 15
  const mapElem = document.getElementById('map')

  var map = new google.maps.Map(mapElem, {
    center: {lat: -34.397, lng: 150.644},
    zoom: INITIAL_ZOOM,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });


  // location http://stackoverflow.com/questions/24952593/how-to-add-my-location-button-in-google-maps
  var geoloccontrol = new klokantech.GeolocationControl(map, INITIAL_ZOOM)

  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      window.getCurrentLocation = pos

      map.setCenter(pos);

      window.setMarkers = function(restaurants){
          restaurants.forEach(restaurant => {
            let location = restaurant.location
            let rating = restaurant.bestRating
            var image=""

            if(rating == 0)
              image = "pale_XMarker.png"
            else if(rating>0 && rating<2.5)
              image = "red_Marker.png"
            else if(rating>=2.5 && rating < 4)
              image = "orange_Marker.png"
            else if(rating>=4)
              image = "green_Marker.png"

            let marker = new google.maps.Marker({
              position: new google.maps.LatLng(location.latitude, location.longitude),
              map: map,
              icon:image
            })

            // display restaurant details
            marker.addListener('click', e => {
              map.setZoom(15)
              map.setCenter(marker.getPosition())
              if ($(window).width() <= 980){ map.panBy(0, 100) }
              window.showRestaurantDetails(restaurant)
          })
        })
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

function showRestaurantDetails(restaurant){
  const detailsElem = $('#details')
  const mealsElem = detailsElem.find('.meals')

  // move and display details elem
  detailsElem.css({
    top: 'calc(50% + 24px)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'block'
  })

  // allow the "close" button to close the popup
  detailsElem.find('.close').one('click', e => {
    detailsElem.css('display', 'none')
  })

  // set name
  detailsElem.find('.name').text(restaurant.name)

  // set meals
  mealsElem.html('')
  restaurant.meals.forEach(meal => {
    const nut = meal.nutrition
    let mealElem = $(`<p>
      <a class="meal-name">${meal.name}</a>
      <span class="meal-rating rating-${meal.rating}">${(meal.rating && meal.rating + '/5') || 'N/A'}</span>
    </p>`)

    // show/hide meal details on click
    mealElem.on('click', e => {
      let existingDetails = mealElem.find('.meal-details')

      if (existingDetails.length){
        existingDetails.remove()
      } else {
        // accordion behavior
        detailsElem.find('.meal-details').remove()
        mealElem.append(`
            <ul class="meal-details">
              <li class="detail-item">
                <label>Calories</label>
                <span>${nut.calories}</span>
              </li>

              <li class="detail-item">
                <label>Fat</label>
                <span>${nut.fats_grams}g</span>
              </li>

              <li class="detail-item">
                <label>Proteins</label>
                <span>${nut.proteins_grams}g</span>
              </li>

              <li class="detail-item">
                <label>Carbohydrates</label>
                <span>${nut.carbohydrates_grams}g</span>
              </li>
            </ul>
          `)
        }
      })

    mealsElem.append(mealElem)
  })
}
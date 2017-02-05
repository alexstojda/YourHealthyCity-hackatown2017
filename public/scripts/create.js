function createRestaurant(){
  var restaurant = {}
  var currentPlace = window.getInputPlace
  $('#create-form').find('.md-form input').toArray().forEach(function(elem){
     var value = elem.value
     var field = $(elem).attr('id')

     restaurant[field] = value
  })

  var unFilled = Object.keys(restaurant).find(function(k){ return !restaurant[k] })
  if (unFilled){
    return alert('Please fill out the required field "' + unFilled + '"')
  } else {
    var restaurantData = {
      name: restaurant.name,
      location: {
        longitude: currentPlace.lng(),
        latitude: currentPlace.lat()
      },
      meals: [
        {
          name: restaurant.mealname,
          price: restaurant.price,
          nutrition: {
            calories: restaurant.calories,
            carbohydrates_grams: restaurant.carbohydrates_grams,
            proteins_grams: restaurant.proteins_grams,
            fats_grams: restaurant.fats_grams
          }
        }
      ]
    }

    $.post('/restaurants', { data: JSON.stringify(restaurantData) })
      .done(function(res){
        console.log(res)
      })
      .fail(function(err){
        alert(err.responseText)
      })
  }
}

      // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initAutocomplete() {
        // Create the search box and link it to the UI element.
        var input = document.getElementById('gmaps');
        var searchBox = new google.maps.places.SearchBox(input);
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          if (places.length == 0)
            window.getInputPlace = null
          else
            window.getInputPlace = places[0].geometry.location
        });
      }
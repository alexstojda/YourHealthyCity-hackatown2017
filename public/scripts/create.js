function createRestaurant(){
  var restaurant = {}

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
        longitude: restaurant.longitude,
        latitude: restaurant.latitude
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
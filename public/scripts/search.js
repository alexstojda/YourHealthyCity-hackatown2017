function test(location){
  var lat = location.lat
  var long = location.lng
  var rad = 5000000
  $.get("/restaurants", { latitude:lat, longitude:long, radius:rad }, function(data, status){
    results = search(data)
    window.setMarkers(results)
    collapseSearch()
  })
}

function search(restaurants){
  var calories = document.getElementById("calories").value
  var carbohydrates = document.getElementById("carbohydrates").value
  var proteins = document.getElementById("proteins").value
  var fats = document.getElementById("fats").value
  var avg = 0
  for (var i = restaurants.length - 1; i >= 0; i--) {
    var restaurant = restaurants[i]
    restaurant.bestRating = 0
    var totalMealRatings = 0
    for (var j = restaurant.meals.length - 1; j >= 0; j--) {
      var meal = restaurant.meals[j]
      avg = getRating(
              meal.nutrition.calories, calories,
              meal.nutrition.carbohydrates_grams, carbohydrates,
              meal.nutrition.proteins_grams, proteins,
              meal.nutrition.fats_grams, fats)
      avg = Math.round(avg*100)/100
      var rating = Math.round(avg * 5)/100
      meal.rating=rating
      totalMealRatings+=rating
      if(rating > restaurant.bestRating)
        restaurant.bestRating=rating
    }
    restaurant.meals = sortMealsByRating(restaurant.meals)
    restaurant.avgRating = Math.round(totalMealRatings / restaurant.meals.length * 100)/100
  }
  restaurants = sortByHighestRating(restaurants)

  return restaurants
}

function getRating(cals,targetCals,carbs,targetCarbs,prots,targetProts,fats,targetFats){
  var calRating = checkCalories(cals, targetCals)
  var carbRating = checkCalories(carbs,targetCarbs)
  var protRating = checkProteins(prots, targetProts)
  var fatRating = checkFats(fats,targetFats)
  var ratingsApplicable = 4

  if(calRating == 0)
    ratingsApplicable--
  if(carbRating == 0)
    ratingsApplicable--
  if(protRating == 0)
    ratingsApplicable--
  if(fatRating == 0)
    ratingsApplicable--

  var avg = (calRating + carbRating + protRating + fatRating)/ratingsApplicable
  if(!isFinite(avg))
    return 0
  return avg
}

function checkCalories(cals,targetCals){
  difference = cals/targetCals * 100
  if(difference > 100)
    difference = targetCals/cals * 100
  return difference
}

function checkCarbs(carbs,targetCarbs){
  difference = carbs/targetCarbs * 100
  if(difference > 100)
    difference = targetCarbs/carbs * 100
  return difference
}

function checkProteins(prots,targetProts){
  difference = prots/targetProts * 100
  if(difference > 100)
    difference = targetProts/prots * 100
  return difference
}

function checkFats(fats,targetFats){
  difference = fats/targetFats * 100
  if(difference > 100)
    difference = targetFats/fats * 100
  return difference
}

function sortMealsByRating(meals){
  meals.sort(function(a,b){
    var rateA = a.rating
    var rateB = b.rating
    return rateA == rateB ? 0 : rateA > rateB ? -1 : 1
  })
  return meals
}

function sortByHighestRating(restaurants){
  restaurants.sort(function(a,b){
    var rateA = a.bestRating
    var rateB = b.bestRating
    return rateA == rateB ? 0 : rateA > rateB ? -1 : 1
  })
  return restaurants
}

function collapseSearch(){
  searchForm = $('#search-form')
  searchToggle = $('#search-toggle')

  searchForm.hide()
  $('#search-form-header').hide()
  $('#search').css('top', 58)
  searchToggle.show()
}

function expandSearch(){
  $('#search-toggle').hide()
  $('#search-form-header').show()
  $('#search').css('top', 10)
  $('#search-form').show()
}
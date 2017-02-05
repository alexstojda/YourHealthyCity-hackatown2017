function test(location){
  var lat = location.lat
  var long = location.lng
  var rad = document.getElementById("radius").value
  $.get("/restaurants", { latitude:lat, longitude:long, radius:rad }, function(data, status){
    console.log(data)
    var results = search(data)
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
      if(avg > 100){
        avg = 100 - (avg - 100)
      }
      var rating = Math.round(avg * 5)/100
      meal.rating=rating
      totalMealRatings+=rating
      if(avg > restaurant.bestRating)
        restaurant.bestRating=rating
    }
    restaurant.meals = sortMealsByRating(restaurant.meals)
    restaurant.avgRating = Math.round(totalMealRatings / restaurant.meals.length * 100)/100
  }
  restaurants = sortByHighestRating(restaurants)



  var fuckYouCuck = JSON.stringify(restaurants)
  $(".test").html(fuckYouCuck)
}

function getRating(cals,targetCals,carbs,targetCarbs,prots,targetProts,fats,targetFats){
  var avg = (checkCalories(cals,targetCals) + checkCarbs(carbs,targetCarbs) + checkProteins(prots,targetProts) + checkFats(fats,targetFats))/4
  return avg
}

function checkCalories(cals,targetCals){
  difference = cals/targetCals * 100
  return difference
}

function checkCarbs(carbs,targetCarbs){
  difference = carbs/targetCarbs * 100
  return difference
}

function checkProteins(prots,targetProts){
  difference = prots/targetProts * 100
  return difference
}

function checkFats(fats,targetFats){
  difference = fats/targetFats * 100
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
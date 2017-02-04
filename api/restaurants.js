const geolib = require('geolib')
const router = require('express').Router()

router.get('/', (req, res) => {
  const position = {
    latitude: parseFloat(req.query.latitude),
    longitude: parseFloat(req.query.longitude)
  }
  const radiusMeters = parseInt(req.query.radius) || 500

  const restaurants = getRestaurants()
  const restaurantsInRadius = restaurants.filter(restaurant => {
      return geolib.getDistance(position, restaurant.location) <= radiusMeters
  })

  res.send(restaurantsInRadius)
})

function getRestaurants(){
  return [
    {
      id: 1,
      name: 'Foo',
      location: {
        latitude: 45.5085997,
        longitude: -73.6207597
      },
      meals: [
        {
          name: 'steak',
          price: 17.5,
          nutrition: {
            calories: 1150,
            carbohydrates_grams: 20,
            proteins_grams: 12,
            fats_grams: 4
          }
        },
        {
          name: 'salad',
          price: 8,
          nutrition: {
            calories: 780,
            carbohydrates_grams: 7,
            proteins_grams: 0.5,
            fats_grams: 0.1
          }
        }
      ]
    },
    {
      id: 2,
      name: 'Bar',
      location: {
        latitude: 45.510996,
        longitude: -73.616470
      },
      meals: [
        {
          name: 'rice',
          price: 12,
          nutrition: {
            calories: 900,
            carbohydrates_grams: 25,
            proteins_grams: 9,
            fats_grams: 2
          }
        }
      ]
    }
  ]
}

module.exports = router
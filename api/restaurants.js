const router = require('express').Router()
require('./db.js');

router.get('/', (req, res) => {
    const position = {
        latitude: parseFloat(req.query.latitude),
        longitude: parseFloat(req.query.longitude)
    }
    const radiusMeters = parseInt(req.query.radius) || 500

    getRestaurantsInRadius(radiusMeters, function (restaurantsInRadius) {
        res.send(restaurantsInRadius);
    });

    // const restaurants = getRestaurants();
    // const restaurantsInRadius = restaurants.filter(restaurant => {
    //     return geolib.getDistance(position, restaurant.location) <= radiusMeters
    // })
    // res.send(restaurantsInRadius)
});

module.exports = router;
const router = require('express').Router()
const db = require('./db.js');

router.get('/', (req, res) => {
    const position = {
        latitude: parseFloat(req.query.latitude),
        longitude: parseFloat(req.query.longitude)
    }
    const radiusMeters = parseInt(req.query.radius) || 500

    db.getRestaurantsInRadius(position, radiusMeters, function (restaurantsInRadius) {
        res.send(restaurantsInRadius);
    });
});

module.exports = router;
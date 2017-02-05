/**
 * Created by alexs on 2017-02-04.
 */
const geolib = require('geolib');

MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
url = 'mongodb://localhost:27017/healthycity';

function getRestaurantByID(id, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        let collection = db.collection('restaurant');

        collection.findOne({'id': id}, function (err, docs) {
            assert.equal(err, null);
            callback(docs);
        });
    });
}

function getRestaurantsByName(name, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        let collection = db.collection('restaurants');

        collection.find({'name': name}).toArray( function (err, docs) {
            assert.equal(err, null);
            callback(docs);
        });
    });
}

function getMealsFromRestaurant(id, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        let collection = db.collection('restaurants');

        collection.findOne({'id': id}, function (err, docs) {
            assert.equal(err, null);
            callback(docs.meals);
        });
    });
}

function getRestaurantsInRadius(radius, callback) {
    const position = {
        latitude: 45,
        longitude: -73
    };

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        let collection = db.collection('restaurants');

        collection.find({
            '$where': function () {
                return geolib.getDistance(position, this['location']) <= radius;
            }
        }).toArray(function(err,data){
            callback(data);
        });
    });
}
getRestaurantsInRadius(10, function (data) {
    console.log(data);
});
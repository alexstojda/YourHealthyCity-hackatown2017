/**
 * Created by alexs on 2017-02-04.
 */
const geolib = require('geolib');
MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
url = process.env.MONGODB_URI;
url = url || 'mongodb://healthycity:xl2etco@ds139979.mlab.com:39979/heroku_mjj4f02b'
// url = 'mongodb://localhost:27017/healthycity';

module.exports = {
    getRestaurantByID: function(id, callback) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);

            let collection = db.collection('restaurants');

            collection.findOne({'id': id}, function (err, docs) {
                assert.equal(err, null);
                callback(docs);
            });
        });
    },

    getRestaurantsByName: function(name, callback) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);

            let collection = db.collection('restaurants');

            collection.find({'name': name}).toArray( function (err, docs) {
                assert.equal(err, null);
                callback(docs);
            });
        });
    },

    getMealsFromRestaurant: function(id, callback) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);

            let collection = db.collection('restaurants');

            collection.findOne({'id': id}, function (err, docs) {
                assert.equal(err, null);
                callback(docs.meals);
            });
        });
    },

    getRestaurantsInRadius: function(position, radius, callback) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);

            let collection = db.collection('restaurants');
            collection.find({
                '$where': function () {
                    return geolib.getDistance(position, obj['location']) <= radius;
                }
            }).toArray(function(err,data){
                callback(data);
            });
        });
    }
}

/**
 * Created by alexs on 2017-02-04.
 */

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/healthycity';

function getRestaurantByID(id, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        var collection = db.collection('restaurant');

        collection.findOne({'id': id}, function(err, docs) {
            assert.equal(err, null);
            callback(docs);
        });
    });
}

function getRestaurantsByName(name, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        var collection = db.collection('restaurants');

        collection.findOne({'name': name}, function(err, docs) {
            assert.equal(err, null);
            callback(docs);
        });
    });
}

function getMealsFromRestaurant(id, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        var collection = db.collection('restaurants');

        collection.findOne({'id': id}, function(err, docs) {
            assert.equal(err, null);
            callback(docs.meals);
        });
    });
}
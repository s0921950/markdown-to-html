'use strict';

// Connection URL 
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/forum02-14';
var collectionName = 'objects';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {

    var contents, id;
    var collection = db.collection(collectionName);

    collection.find({"_key":"global"}).toArray(function(err, docs) {

        docs.forEach(function(element) {
            id = element._id;
            var value = element.value;

            collection.find({"_key":"ip:recent"}).toArray(function(err, docs) {
                var uniqueIPCount  = docs.length;
                console.log(docs.length);
                collection.updateOne({_id : id}, {$set: {uniqueIPCount : uniqueIPCount}}, function(err, result) {
                    console.log(err);
                    db.close();
                });
            })
        });
    });
});
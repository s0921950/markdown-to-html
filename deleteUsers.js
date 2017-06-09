'use strict';

// Connection URL 
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/cache';
var collectionName = 'objects';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var contents, id;
    var collection = db.collection(collectionName);

    for (var i = 1; i <= 100; i++) {

        var uid  = 100000 + i;
        var _key = "user:" + uid;
        var username = "foxconn_test_user" + uid;
        var value = "foxconn_test_user:" + uid;
        collection.removeOne({"_key" : _key});


        collection.removeOne({"_key" : "username:uid", "value" : username});


        var sorted  = {
            "_key" : "username:sorted",
            "value" : value,
            "score" : 0
        };
        collection.removeOne({"_key" : "username:sorted", "value" : value});


        var userslug  = {
            "_key" : "userslug:uid",
            "value" : username,
            "score" : uid
        };
        collection.removeOne({"_key" : "userslug:uid", "value" : username});

        // var members  = {
        //     "_key" : "group:registered-users:members",
        //     "value" : uid,
        //     "score" : 1495731105284.0
        // };
        // collection.removeOne({"_key" : "group:registered-users:members", "value" : uid});


        var joindate  = {
            "_key" : "users:joindate",
            "value" : uid,
            "score" : 1495731011853.0
        };
        collection.removeOne({"_key" : "users:joindate", "value" : uid});


        var uidString = "" + uid;
        var group  = {
            "_key" : "group:registered-users:members",
            "value" : uidString,
            "score" : 1495731011853.0
        };
        collection.removeOne({"_key" : "group:registered-users:members", "value" : uidString});
    }

    db.close();
});
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
        var user  = {
            "_key" : _key,
            "username" : username,
            "userslug" : username,
            "email" : "adam.yh.dong@gmail.com" + uid,
            "joindate" : 1490613520594.0,
            "lastonline" : 1495531828909.0,
            "picture" : "",
            "fullname" : "",
            "location" : "",
            "birthday" : "",
            "website" : "",
            "signature" : "",
            "uploadedpicture" : "",
            "profileviews" : 0,
            "reputation" : 0,
            "postcount" : 0,
            "topiccount" : 0,
            "lastposttime" : 1495531953482.0,
            "banned" : 0,
            "status" : "online",
            "uid" : uid,
            "password" : "$2a$12$6WIg2WaKmUNLHU.cA/tkSewhQ0TXZcGtWdzpkiK.74R2/dHfSGIOK",
            "passwordExpiry" : 0
        };
        collection.insert(user);


        var username_uid  = {
            "_key" : "username:uid",
            "value" : username,
            "score" : uid
        };
        collection.insert(username_uid);


        var sorted  = {
            "_key" : "username:sorted",
            "value" : value,
            "score" : 0
        };
        collection.insert(sorted);


        var userslug  = {
            "_key" : "userslug:uid",
            "value" : username,
            "score" : uid
        };
        collection.insert(userslug);

        // var members  = {
        //     "_key" : "group:registered-users:members",
        //     "value" : uid,
        //     "score" : 1495731105284.0
        // };
        // collection.insert(members);


        var joindate  = {
            "_key" : "users:joindate",
            "value" : uid,
            "score" : 1495731011853.0
        };
        collection.insert(joindate);

        var uidString = "" + uid;
        var group  = {
            "_key" : "group:registered-users:members",
            "value" : uidString,
            "score" : 1495731011853.0
        };
        collection.insert(group);
    }
        

    db.close();
});
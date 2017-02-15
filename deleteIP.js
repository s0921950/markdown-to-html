'use strict';

// Connection URL 
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/forum02-14';
var collectionName = 'objects';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {

	var contents, id;
	var collection = db.collection(collectionName);

	collection.find({"_key":"ip:recent"}).toArray(function(err, docs) {

        docs.forEach(function(element) {
            id = element._id;
            var value = element.value;
            if(ValidateIPaddress(value)){

            } else {
                collection.remove({"_id" : id}, function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    db.close();
                });
            }
        });

    });
});

function ValidateIPaddress(inputText){
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (inputText.match(ipformat)) {
        return true;
    } else {
        return false;
    }
}
